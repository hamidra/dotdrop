const decodeResult = (api, result) => {
  const { dispatchInfo, dispatchError, events = [] } = result;
  const success = !dispatchError;
  const txEvents = events
    .filter(({ event }) => !api?.events.system.ExtrinsicFailed.is(event))
    .map(({ event }) => event);
  const txErrors = events
    .filter(({ event }) => api?.events.system.ExtrinsicFailed.is(event))
    .map(({ event }) => event?.data?.error);
  console.log({ success, events: txEvents, errors: txErrors });
  return { success, events: txEvents, errors: txErrors };
};

export const signAndSendTx = async (api, tx, signingAccount, cb) => {
  const { pairOrAddress, signer } = signingAccount;
  await tx.signAsync(pairOrAddress, { signer });
  const unsub = await tx.send(({ status, ...result }) => {
    if (status.isInBlock) {
      const dispatchResult = decodeResult(api, result);
      console.log(
        `Transaction ${
          tx.meta.name
        }(${tx.args.toString()}) included at blockHash ${
          status.asInBlock
        } [success = ${dispatchResult.success}]`
      );
      console.log(result);
      cb && cb({ ...dispatchResult });
    } else if (status.isBroadcast) {
      console.log('Transaction broadcasted.');
    } else if (status.isFinalized) {
      unsub();
    } else if (status.isReady) {
      console.log('Transaction isReady.');
    } else {
      console.log(`Other status ${status}`);
    }
  });
};
