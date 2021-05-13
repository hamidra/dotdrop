import utils from './substrateUtils';
const signAndSendTx = async (tx, signingAccount, cb) => {
  const { pairOrAddress, signer } = signingAccount;
  await tx.signAsync(pairOrAddress, { signer });
  const unsub = await tx.send((result) => {
    console.log(`Current status is ${JSON.stringify(result, null, 2)}`);
    if (result.status.isInBlock) {
      console.log(
        `Transaction included at blockHash ${result.status.asInBlock}`
      );
      cb && cb({ result });
    } else if (result.status.isFinalized) {
      console.log(
        `Transaction finalized at blockHash ${result.status.asFinalized}`
      );
      unsub();
    }
  });
};

const createGift = async (api, signingAccount, gift, cb) => {
  console.log(
    `Sending a gift from ${signingAccount} to ${gift.to} of amount of ${gift.amount}`
  );
  try {
    const chainAmount = utils.toChainUnit(
      gift.amount,
      api.registry.chainDecimals
    );
    const tx = api.tx.gift.gift(chainAmount, gift.to.address);
    await signAndSendTx(tx, signingAccount, cb);
  } catch (error) {
    console.log(error);
    cb && cb({ error });
  }
};

const claimGift = async (api, signingAccount, claim, cb) => {
  console.log(
    `Claiming the gift  ${signingAccount?.pairOrAddress?.address} to ${claim?.by}`
  );
  try {
    if (!claim?.by) {
      throw new Error('No address was specified to redeem the gift to');
    }
    const tx = api.tx.gift.claim(claim?.by);
    await signAndSendTx(tx, signingAccount, cb);
  } catch (error) {
    cb && cb({ error });
  }
};

const removeGift = async (api, signingAccount, gift, cb) => {
  console.log(`Removing the gift  ${gift.to} by ${signingAccount}`);
  try {
    const tx = api.tx.gift.remove(gift.to.address);
    await signAndSendTx(tx, signingAccount, cb);
  } catch (error) {
    cb && cb({ error });
  }
};
const giftPallet = { createGift, claimGift, removeGift };
export default giftPallet;
