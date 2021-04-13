import BN from 'bn.js';

const getChainAmount = (chainDecimal, amount) => {
  const bn10 = new BN('10', 10);
  const bnChainDecimal = new BN(chainDecimal, 10);
  const bnChainUnit = bn10.pow(bnChainDecimal);
  const bnAmount = new BN(amount, 10);
  return bnAmount.mul(bnChainUnit).toString();
};

const createGift = async (api, { from, to, amount }) => {
  console.log(
    `Sending a gift from ${from.address} to ${to.address} of amount of ${amount}`
  );

  const chainAmount = getChainAmount(api.registry.chainDecimals, amount);
  const unsub = await api.tx.gift
    .gift(chainAmount, to.address)
    .signAndSend(from, (result) => {
      console.log(`Current status is ${JSON.stringify(result, null, 2)}`);
      if (result.status.isInBlock) {
        console.log(
          `Transaction included at blockHash ${result.status.asInBlock}`
        );
      } else if (result.status.isFinalized) {
        console.log(
          `Transaction finalized at blockHash ${result.status.asFinalized}`
        );
        unsub();
      }
    });
};

const claimGift = async (api, { giftAccount, toAccount }) => {
  console.log(
    `Claiming the gift  ${giftAccount.address} to ${toAccount.address}`
  );
  const unsub = await api.tx.gift
    .claim(toAccount.address)
    .signAndSend(giftAccount, (result) => {
      console.log(`Current status is ${JSON.stringify(result, null, 2)}`);
      if (result.status.isInBlock) {
        console.log(
          `Transaction included at blockHash ${result.status.asInBlock}`
        );
      } else if (result.status.isFinalized) {
        console.log(
          `Transaction finalized at blockHash ${result.status.asFinalized}`
        );
        unsub();
      }
    });
};

const removeGift = async (api, { fromAccount, giftAccount }) => {
  console.log(
    `Removing the gift  ${giftAccount.address} by ${fromAccount.address}`
  );
  const unsub = await api.tx.gift
    .remove(giftAccount.address)
    .signAndSend(fromAccount, (result) => {
      console.log(`Current status is ${JSON.stringify(result, null, 2)}`);
      if (result.status.isInBlock) {
        console.log(
          `Transaction included at blockHash ${result.status.asInBlock}`
        );
      } else if (result.status.isFinalized) {
        console.log(
          `Transaction finalized at blockHash ${result.status.asFinalized}`
        );
        unsub();
      }
    });
};
const giftPallet = { createGift, claimGift, removeGift };
export default giftPallet;
