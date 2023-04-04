import balancePalletGiftProvider from './balancePalletGiftProvider';
import bundleGiftProvider from './bundleGiftProvider';

const palletTypes = {
  balance: 'balance',
  bundle: 'bundle',
  // ToDo: add other pallets
  // asset: 'asset',
};

const giftFactory = (palletType) => {
  let giftProvider;
  switch (palletType) {
    case palletTypes.balance:
      giftProvider = balancePalletGiftProvider;
      break;
    case palletTypes.bundle:
      giftProvider = bundleGiftProvider;
      break;
    default:
      giftProvider = balancePalletGiftProvider;
  }
  return giftProvider;
};
const giftProvider = giftFactory(palletTypes.bundle);
export { giftProvider };
