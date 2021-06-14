import { promisify } from '@polkadot/util';
import BN from 'bn.js';
import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';

const classId = 2;
const transferAllAssets = async (api, classId, fromAccount, toAddress) => {
  const fromAddress = utils.getAccountAddress(fromAccount);

  // Create Txs for uniques NFTs
  // 1- get the list of all uniques inceseIds owned by this source Account
  const uniquesTxs = [];
  const uniquesFeeQueries = [];
  const assets = await api.query.uniques.asset.entries(classId);
  const ownedInstances = [];
  assets.forEach(([key, value]) => {
    if (value?.toJSON()?.owner === fromAddress) {
      const [_, instanceId] = key.args;
      ownedInstances.push(instanceId);
      const tx = api.tx.uniques.transfer(classId, instanceId, toAddress);
      const feeQuery = api.rpc.payment.queryInfo(tx.toHex());
      uniquesTxs.push(tx);
      uniquesFeeQueries.push(feeQuery);
    }
  });
  const uniquesFeesInfo = await Promise.all(uniquesFeeQueries);
  const uniquesFees = uniquesFeesInfo.reduce(
    (total, feeInfo) =>
      total.add(utils.calcFeeAdjustments(feeInfo?.partialFee)),
    new BN(0, 10)
  );

  const uniquesBatchTx = api.tx.utility.batch(uniquesTxs);
  const sendUniquesBatchTx = new Promise((resolve, reject) =>
    signAndSendTx(uniquesBatchTx, fromAccount, ({ result, error }) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }).catch((error) => reject(error))
  );

  // create Tx for balance transfer
  const balance = (await api.query.system.account(fromAddress))?.data;
  let balanceFee =
    (
      await api.tx.balances
        .transfer(toAddress, balance?.free || 0)
        .paymentInfo(fromAddress)
    )?.partialFee || new BN(0, 10);
  balanceFee = utils.calcFeeAdjustments(balanceFee);

  // assuming all fees are deduced from account balance.
  const totalFees = balanceFee.add(uniquesFees);
  if (totalFees.gt(balance?.free)) {
    throw new Error('the total fees are greater than the balance.');
  }
  const netBalance = balance?.free?.sub(totalFees);
  const balanceTx = api.tx.balances.transfer(toAddress, netBalance);
  const sendBalanceTx = new Promise((resolve, reject) =>
    signAndSendTx(balanceTx, fromAccount, ({ result, error }) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }).catch((error) => reject(error))
  );

  return Promise.all([sendUniquesBatchTx, sendBalanceTx]);
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
