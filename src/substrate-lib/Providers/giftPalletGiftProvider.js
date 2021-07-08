import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';

const createGift = async (api, senderAccount, interimAddress, amount) => {
  if (!interimAddress) {
    throw new Error('No address was specified to redeem the gift to');
  }
  const chainAmount = utils.toChainUnit(amount, api.registry.chainDecimals);
  const tx = api.tx.gift.gift(chainAmount, interimAddress);

  return signAndSendTx(api, tx, senderAccount);
};

const claimGift = async (api, interimAccount, recipientAddress) => {
  if (!recipientAddress) {
    throw new Error('No address was specified to redeem the gift to');
  }
  const tx = api.tx.gift.claim(recipientAddress);
  return signAndSendTx(api, tx, interimAccount);
};

const removeGift = async (api, senderAccount, interimAddress) => {
  const tx = api.tx.gift.remove(interimAddress);
  return signAndSendTx(api, tx, senderAccount);
};

const giftPalletGiftProvider = {
  createGift: (api, interimAccount, senderAccount, gift) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    return createGift(api, senderAccount, interimAddress, gift?.amount);
  },
  claimGift: (api, interimAccount, recipientAccount) => {
    const recipientAddress = utils.getAccountAddress(recipientAccount);
    return claimGift(api, interimAccount, recipientAddress);
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    return removeGift(api, senderAccount, interimAddress);
  },
  getGiftFeeMultiplier: () => {
    // gift creation fees are free on gift pallet
    return 0;
  },
};

export default giftPalletGiftProvider;
