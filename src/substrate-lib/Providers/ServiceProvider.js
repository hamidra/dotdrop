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
  createGift: (api, interimAccount, senderAccount, gift, cb) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    balancePallet.transfer(
      api,
      senderAccount,
      interimAddress,
      gift?.amount,
      cb
    );
  },
  claimGift: (api, interimAccount, recipientAccount, cb) => {
    const recepientAddress = utils.getAccountAddress(recipientAccount);
    balancePallet.transferAll(api, interimAccount, recepientAddress, cb);
  },
  removeGift: (api, interimAccount, senderAccount, cb) => {
    const senderAddress = utils.getAccountAddress(senderAccount);
    balancePallet.transferAll(api, interimAccount, senderAddress, cb);
  },
};
const giftPalletProvider = {
  createGift: (api, interimAccount, senderAccount, gift, cb) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    giftPallet.createGift(api, senderAccount, interimAddress, gift?.amount, cb);
  },
  claimGift: (api, interimAccount, recipientAccount, cb) => {
    const recipientAddress = utils.getAccountAddress(recipientAccount);
    giftPallet.claimGift(api, interimAccount, recipientAddress, cb);
  },
  removeGift: (api, interimAccount, senderAccount, cb) => {
    const interimAddress = utils.getAccountAddress(interimAccount);
    giftPallet.removeGift(api, senderAccount, interimAddress, cb);
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
