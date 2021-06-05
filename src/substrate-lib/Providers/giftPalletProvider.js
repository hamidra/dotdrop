import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';

const createGift = async (api, senderAccount, interimAddress, amount, cb) => {
  try {
    if (!interimAddress) {
      throw new Error('No address was specified to redeem the gift to');
    }
    const chainAmount = utils.toChainUnit(amount, api.registry.chainDecimals);
    const tx = api.tx.gift.gift(chainAmount, interimAddress);
    await signAndSendTx(tx, senderAccount, cb);
  } catch (error) {
    console.log(error);
    cb && cb({ error });
  }
};

const claimGift = async (api, interimAccount, recipientAddress, cb) => {
  try {
    if (!recipientAddress) {
      throw new Error('No address was specified to redeem the gift to');
    }
    const tx = api.tx.gift.claim(recipientAddress);
    await signAndSendTx(tx, interimAccount, cb);
  } catch (error) {
    cb && cb({ error });
  }
};

const removeGift = async (api, senderAccount, interimAddress, cb) => {
  try {
    const tx = api.tx.gift.remove(interimAddress);
    await signAndSendTx(tx, senderAccount, cb);
  } catch (error) {
    cb && cb({ error });
  }
};
const giftPallet = { createGift, claimGift, removeGift };
export default giftPallet;
