import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';
import BN from 'bn.js';

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
    signAndSendTx(tx, fromAccount, ({ result, error }) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }).catch((error) => reject(error))
  );
};

const uniquesPallet = { transferAllAssets };
export default uniquesPallet;
