import { promisify } from '@polkadot/util';
import BN from 'bn.js';
import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';

const classId = 2;
const transferAllAssets = async (api, classId, fromAccount, toAddress) => {
  const fromAddress = utils.getAccountAddress(fromAccount);

  // Create Txs for uniques NFTs
  // 1- get the list of all uniques instanceIds owned by this source Account
  const uniquesTxs = [];
  const assets = await api.query.uniques.asset.entries(classId);
  const ownedInstances = [];
  assets.forEach(([key, value]) => {
    if (value?.toJSON()?.owner === fromAddress) {
      const [_, instanceId] = key.args;
      ownedInstances.push(instanceId);
      const tx = api.tx.uniques.transfer(classId, instanceId, toAddress);
      uniquesTxs.push(tx);
    }
  });

  // create Tx for balance transfer
  // calculate the fee for batch transaction to get netBalance as netBalance=balance - txFee
  const balance = (await api.query.system.account(fromAddress))?.data;
  const dummyBalanceTx = await api.tx.balances.transfer(
    toAddress,
    balance?.free || 0
  );

  const dummyTxs = [...uniquesTxs, dummyBalanceTx];

  let txFee =
    (await api.tx.utility.batch(dummyTxs).paymentInfo(fromAddress))
      ?.partialFee || new BN(0, 10);
  txFee = utils.calcFeeAdjustments(txFee);

  // assuming all fees are deducted from account balance.
  if (txFee.gt(balance?.free)) {
    throw new Error('the total fees are greater than the balance.');
  }
  const netBalance = balance?.free?.sub(txFee);
  const balanceTxs = netBalance
    ? [api.tx.balances.transfer(toAddress, netBalance)]
    : [];
  const txs = [...uniquesTxs, ...balanceTxs];
  const batchTx = api.tx.utility.batch(txs);

  return new Promise((resolve, reject) =>
    signAndSendTx(batchTx, fromAccount, ({ result, error }) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }).catch((error) => reject(error))
  );
};

const uniquesPalletGiftProvider = {
  createGift: (api, interimAccount, senderAccount, gift) => {
    return Promise.reject(new Error('not implemented.'));
  },
  claimGift: (api, interimAccount, recipientAccount) => {
    const recepientAddress = utils.getAccountAddress(recipientAccount);
    return transferAllAssets(api, classId, interimAccount, recepientAddress);
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const senderAddress = utils.getAccountAddress(senderAccount);
    return transferAllAssets(api, classId, interimAccount, senderAddress);
  },
  getGiftFeeMultiplier: () => {
    // ToDO: calculate gift creation Fee for the gift
    return 0;
  },
};

export default uniquesPalletGiftProvider;
