import giftPallet from './giftPalletProvider';
import balancePallet from './balancePalletProvider';
import utils from '../substrateUtils';
const palletTypes = {
  balance: 'balance',
  gift: 'gift',
  // ToDo: add other pallets
  // asset: 'asset',
  // unique: 'unique',
};

const balancePalletProvider = {
  createGift: (api, interimAccount, senderAccount, gift) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    return balancePallet.transfer(
      api,
      senderAccount,
      interimAddress,
      gift?.amount
    );
  },
  claimGift: (api, interimAccount, recipientAccount) => {
    const recepientAddress = utils.getAccountAddress(recipientAccount);
    return balancePallet.transferAll(api, interimAccount, recepientAddress);
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const senderAddress = utils.getAccountAddress(senderAccount);
    return balancePallet.transferAll(api, interimAccount, senderAddress);
  },
};
const giftPalletProvider = {
  createGift: (api, interimAccount, senderAccount, gift) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    return giftPallet.createGift(
      api,
      senderAccount,
      interimAddress,
      gift?.amount
    );
  },
  claimGift: (api, interimAccount, recipientAccount) => {
    const recipientAddress = utils.getAccountAddress(recipientAccount);
    return giftPallet.claimGift(api, interimAccount, recipientAddress);
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    return giftPallet.removeGift(api, senderAccount, interimAddress);
  },
};

const giftFactory = (palletType) => {
  let giftProvider;
  switch (palletType) {
    case palletTypes.balance:
      giftProvider = balancePalletProvider;
      break;
    case palletTypes.gift:
      giftProvider = giftPalletProvider;
      break;
    default:
      giftProvider = giftPalletProvider;
  }
  return giftProvider;
};
const giftProvider = giftFactory(palletTypes.balance);
export { giftProvider };
