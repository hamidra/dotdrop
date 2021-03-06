import giftPalletGiftProvider from './giftPalletGiftProvider';
import balancePalletGiftProvider from './balancePalletGiftProvider';
import uniquesPalletGiftProvider from './uniquesPalletGiftProvider';
import bundleGiftProvider from './bundleGiftProvider';

const palletTypes = {
  balance: 'balance',
  gift: 'gift',
  bundle: 'bundle',
  uniques: 'uniques'
  // ToDo: add other pallets
  // asset: 'asset',
};

const giftFactory = (palletType) => {
  let giftProvider;
  switch (palletType) {
    case palletTypes.balance:
      giftProvider = balancePalletGiftProvider;
      break;
    case palletTypes.gift:
      giftProvider = giftPalletGiftProvider;
      break;
    case palletTypes.uniques:
      giftProvider = uniquesPalletGiftProvider;
      break;
    case palletTypes.bundle:
      giftProvider = bundleGiftProvider;
      break;
    default:
      giftProvider = balancePalletGiftProvider;
  }
  return giftProvider;
};
const giftProvider = giftFactory(palletTypes.balance);
export { giftProvider };
