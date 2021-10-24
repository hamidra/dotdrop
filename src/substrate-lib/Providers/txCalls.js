import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';
import BN from 'bn.js';

export const transferAll = async (api, fromAccount, toAddress, remark) => {
  const balanceTx = api.tx.balances.transferAll(toAddress, false);
  const remarkTx = api.tx.system.remarkWithEvent(remark);
  const txs = [balanceTx, remarkTx];
  const batchTx = api.tx.utility.batchAll(txs);

  return signAndSendTx(api, batchTx, fromAccount);
};

export const transferBalanceAndFees = async (
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
  const info = await api.tx.utility.batchAll(txs).paymentInfo(fromAddress);
  const feeAdjustment = utils.calcFeeAdjustments(info?.partialFee);
  const chainAmountAndFees = chainAmount.add(
    feeAdjustment.mul(new BN(feeMultiplier || 1))
  );
  const transferTxFinal = api.tx.balances.transfer(toAddress, chainAmountAndFees);
  const txsFinal = [transferTxFinal, remarkTx];
  const tx = api.tx.utility.batchAll(txsFinal);
  return signAndSendTx(api, tx, fromAccount);
};

export const transferAllAssets = async (api, fromAccount, toAddress, remark) => {
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
