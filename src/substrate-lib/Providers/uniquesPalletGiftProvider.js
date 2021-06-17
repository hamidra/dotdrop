import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';
import BN from 'bn.js';

const classId = 2;
const transferAllAssets = async (api, classId, fromAccount, toAddress) => {
  const fromAddress = utils.getAccountAddress(fromAccount);
  // get the list of all inceseIds owned by this source Account
  const assets = await api.query.uniques.asset.entries(classId);
  const ownedInstances = [];
  const txs = [];
  assets.forEach(([key, value]) => {
    if (value?.toJSON()?.owner === fromAddress) {
      const [_, instanceId] = key.args;
      ownedInstances.push(instanceId);
      txs.push(api.tx.uniques.transfer(classId, instanceId, toAddress));
    }
  });

  // send a batch request to transfer the ownership of the assets to the des address
  const tx = api.tx.utility.batch(txs);
  return new Promise((resolve, reject) =>
    signAndSendTx(api, tx, fromAccount, ({ result, error }) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }).catch((error) => reject(error))
  );
};

const uniquesPalletGiftProvider = {
  createGift: (api, interimAccount, senderAccount, gift) => {
    return Promise.reject(new Error('not implemented.'));
  },
  claimGift: (api, interimAccount, recipientAccount) => {
    const recepientAddress = utils.getAccountAddress(recipientAccount);
    return transferAllAssets(api, classId, interimAccount, recepientAddress);
  },
  removeGift: (api, interimAccount, senderAccount) => {
    const senderAddress = utils.getAccountAddress(senderAccount);
    return transferAllAssets(api, classId, interimAccount, senderAddress);
  },
  getGiftFeeMultiplier: () => {
    // ToDO: find gift creation fees for uniques
    return 0;
  },
};

export default uniquesPalletGiftProvider;
