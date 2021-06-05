import utils from '../substrateUtils';
import { signAndSendTx } from './txHandler';
import BN from 'bn.js';
const transfer = async (api, fromAccount, toAddress, balance, cb) => {
  try {
    const chainAmount = utils.toChainUnit(balance, api.registry.chainDecimals);
    const tx = api.tx.balances.transfer(toAddress, chainAmount);
    await signAndSendTx(tx, fromAccount, cb);
  } catch (error) {
    console.log(error);
    cb && cb({ error });
  }
};

const transferAll = async (api, fromAccount, toAddress, cb) => {
  try {
    const fromAddress = utils.getAccountAddress(fromAccount);
    const { data: balance } = await api.query.system.account(fromAddress);
    const info = await api.tx.balances
      .transfer(toAddress, balance.free)
      .paymentInfo(fromAddress);
    const netBalance = balance?.free?.sub(new BN(info?.partialFee));
    const tx = api.tx.balances.transfer(toAddress, netBalance);
    await signAndSendTx(tx, fromAccount, cb);
  } catch (error) {
    console.log(error);
    cb && cb({ error });
  }
};

const balancePallet = { transfer, transferAll };
export default balancePallet;
