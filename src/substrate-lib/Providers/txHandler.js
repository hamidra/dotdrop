export const signAndSendTx = async (tx, signingAccount, cb) => {
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
