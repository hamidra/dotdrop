import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';
import BN from 'bn.js';
const transfer = async (api, fromAccount, toAddress, balance, cb) => {
  const chainAmount = utils.toChainUnit(balance, api.registry.chainDecimals);
  const tx = api.tx.balances.transfer(toAddress, chainAmount);
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
  const netBalance = balance?.free?.sub(new BN(info?.partialFee));
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

const balancePallet = { transfer, transferAll };
export default balancePallet;
