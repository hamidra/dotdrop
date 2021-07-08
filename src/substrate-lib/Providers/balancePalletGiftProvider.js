import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';
import BN from 'bn.js';

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

const transferAll = async (api, fromAccount, toAddress) => {
  const fromAddress = utils.getAccountAddress(fromAccount);

  const { data: balance } = await api.query.system.account(fromAddress);
  let txFee =
    (
      await api.tx.balances
        .transfer(toAddress, balance.free)
        .paymentInfo(fromAddress)
    )?.partialFee || new BN(0, 10);
  txFee = utils.calcFeeAdjustments(txFee);

  // assuming all fees are deducted from account balance.
  if (txFee.gt(balance?.free)) {
    throw new Error('the total fees are greater than the balance.');
  }
  const netBalance = balance?.free?.sub(txFee);
  const tx = api.tx.balances.transfer(toAddress, netBalance);
  return signAndSendTx(api, tx, fromAccount);
};

const balancePalletGiftProvider = {
  createGift: (api, interimAccount, senderAccount, gift) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    return transferBalanceAndFees(
      api,
      senderAccount,
      interimAddress,
      gift?.amount,
      feeMultiplierValue // fee multiplier of 1x
    );
  },
  claimGift: (api, interimAccount, recipientAccount) => {
    const recepientAddress = utils.getAccountAddress(recipientAccount);
    return transferAll(api, interimAccount, recepientAddress);
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const senderAddress = utils.getAccountAddress(senderAccount);
    return transferAll(api, interimAccount, senderAddress);
  },
  getGiftFeeMultiplier: () => {
    // gift creation fees are equal to 1x (for final tranaction from the gift interim account to the recipient account)
    return feeMultiplierValue;
  },
};

export default balancePalletGiftProvider;
