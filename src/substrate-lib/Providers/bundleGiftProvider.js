import BN from 'bn.js';
import utils from '../substrateUtils';
import { signAndSendTx, getClaimedAssets } from './txHandler';

const classIds = [1, 2];

// the balance that will be tranferred to the gift account
// in order to cover the cost of final tx from gift account to recepient account.
const feeMultiplierValue = 1;
const transferBalanceAndFees = async (
  api,
  fromAccount,
  toAddress,
  balance,
  feeMultiplier
) => {
  const chainAmount = utils.toChainUnit(balance, api.registry.chainDecimals);
  const fromAddress = utils.getAccountAddress(fromAccount);
  const info = await api.tx.balances
    .transfer(toAddress, chainAmount)
    .paymentInfo(fromAddress);
  const feeAdjustment = utils.calcFeeAdjustments(info?.partialFee);
  const chainAmountAndFees = chainAmount.add(
    feeAdjustment.mul(new BN(feeMultiplier || 0))
  );
  const tx = api.tx.balances.transfer(toAddress, chainAmountAndFees);
  return signAndSendTx(api, tx, fromAccount);
};
const transferAllAssets = async (api, classIds, fromAccount, toAddress) => {
  const fromAddress = utils.getAccountAddress(fromAccount);

  // Create Txs for uniques NFTs
  // 1- get the list of all uniques instanceIds owned by this source Account
  const uniquesTxs = [];
  const ownedAssets = [];
  for (const cid of classIds) {
    const assets = await api.query.uniques.asset.entries(cid);
    assets.forEach(([key, value]) => {
      if (value?.toJSON()?.owner === fromAddress) {
        const [classId, instanceId] = key.args;
        ownedAssets.push({ classId, instanceId });
        const tx = api.tx.uniques.transfer(classId, instanceId, toAddress);
        uniquesTxs.push(tx);
      }
    });
  }
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
  const batchTx = api.tx.utility.batchAll(txs);

  return signAndSendTx(api, batchTx, fromAccount);
};

const uniquesPalletGiftProvider = {
  createGift: async (api, interimAccount, senderAccount, gift) => {
    // currently create only supports balances
    const interimAddress = utils.getAccountAddress(interimAccount);
    return transferBalanceAndFees(
      api,
      senderAccount,
      interimAddress,
      gift?.amount,
      feeMultiplierValue // fee multiplier of 1x
    );
  },
  claimGift: async (api, interimAccount, recipientAccount) => {
    const recepientAddress = utils.getAccountAddress(recipientAccount);
    const events = await transferAllAssets(
      api,
      classIds,
      interimAccount,
      recepientAddress
    );
    const claimed = getClaimedAssets(events);
    return claimed;
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const senderAddress = utils.getAccountAddress(senderAccount);
    return transferAllAssets(api, classIds, interimAccount, senderAddress);
  },
  getGiftFeeMultiplier: () => {
    // ToDO: calculate gift creation Fee for the gift
    return feeMultiplierValue;
  },
};

export default uniquesPalletGiftProvider;
