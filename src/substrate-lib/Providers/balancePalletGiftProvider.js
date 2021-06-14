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
  return new Promise((resolve, reject) =>
    signAndSendTx(tx, fromAccount, ({ result, error }) => {
      if (error) {
        reject(error);
      }
      const { events } = result;
      const transferEvent = events.filter(({ event }) =>
        api?.events?.balances?.Transfer?.is(event)
      );

      const value = transferEvent[0]?.event?.data[2]?.toString();
      resolve(value);
    }).catch((error) => reject(error))
  );
};

const transferAll = async (api, fromAccount, toAddress) => {
  const fromAddress = utils.getAccountAddress(fromAccount);
  const { data: balance } = await api.query.system.account(fromAddress);
  const info = await api.tx.balances
    .transfer(toAddress, balance.free)
    .paymentInfo(fromAddress);
  const netBalance = balance?.free?.sub(new BN(info?.partialFee || 0));
  const tx = api.tx.balances.transfer(toAddress, netBalance);
  return new Promise((resolve, reject) =>
    signAndSendTx(tx, fromAccount, ({ result, error }) => {
      if (error) {
        reject(error);
      }
      const { events } = result;
      const transferEvent = events.filter(({ event }) =>
        api?.events?.balances?.Transfer?.is(event)
      );

      const value = transferEvent[0]?.event?.data[2]?.toString();
      resolve(value);
    }).catch((error) => reject(error))
  );
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
