import BN from 'bn.js';
import utils from '../substrateUtils';
import { signAndSendTx, getClaimedAssets } from './txHandler';
import config from '../../config';
const feeMultiplierValue = config.ADDED_FEE_MULTIPLIER;
const transferBalanceAndFees = async (
  api,
  fromAccount,
  toAddress,
  balance,
  feeMultiplier,
  remark
) => {
  const chainAmount = utils.toChainUnit(balance, api.registry.chainDecimals);
  const fromAddress = utils.getAccountAddress(fromAccount);
  const transferTx = api.tx.balances.transfer(toAddress, chainAmount);
  const remarkTx = api.tx.system.remarkWithEvent(remark);
  const txs = [transferTx, remarkTx];
  const info = api.tx.utility.batchAll(txs).paymentInfo(fromAddress);
  const feeAdjustment = utils.calcFeeAdjustments(info?.partialFee);
  const chainAmountAndFees = chainAmount.add(
    feeAdjustment.mul(new BN(feeMultiplier || 1))
  );
  const transferTxFinal = api.tx.balances.transfer(toAddress, chainAmountAndFees);
  const txsFinal = [transferTxFinal, remarkTx];
  const tx = api.tx.utility.batchAll(txsFinal);
  return signAndSendTx(api, tx, fromAccount);
};

const transferAllAssets = async (api, fromAccount, toAddress, remark) => {
  const fromAddress = utils.getAccountAddress(fromAccount);

  // Create Txs for uniques NFTs
  // 1- get the list of all uniques instanceIds owned by this source Account
  const uniquesTxs = [];
  const assetKeys = await api.query.uniques.account.keys(fromAddress);
  assetKeys.forEach(({ args: [_, classId, instanceId] }) => {
    const tx = api.tx.uniques.transfer(classId, instanceId, toAddress);
    uniquesTxs.push(tx);
  });

  // create Tx for balance transferAll to reap account and tranfer all balance.
  const balanceTxs = [api.tx.balances.transferAll(toAddress, false)];
  const remarkTxs = [api.tx.system.remarkWithEvent(remark)];
  const txs = [...uniquesTxs, ...balanceTxs, ...remarkTxs];
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
      feeMultiplierValue, // fee multiplier of 1x
      'gift::create'
    );
  },
  claimGift: async (api, interimAccount, recipientAccount) => {
    const recepientAddress = utils.getAccountAddress(recipientAccount);
    const events = await transferAllAssets(
      api,
      interimAccount,
      recepientAddress,
      'gift::claim'
    );
    const claimed = getClaimedAssets(api, events);
    return claimed;
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const senderAddress = utils.getAccountAddress(senderAccount);
    return transferAllAssets(api, interimAccount, senderAddress, 'gift::remove');
  },
  getGiftFeeMultiplier: () => {
    // gift creation fees are multiplied by this multiplier and added to the gift value when the gift is generated.
    // the gift value is calculated as : gift_amount + feeMultiplierValue*(txfee)
    // The added fee amount will cover the fees for the tranaction from the interim gif account to the recipient account during claim process
    // , plus  maybe some more transactions after the claim that are covered.
    return feeMultiplierValue;
  }
};

export default uniquesPalletGiftProvider;
