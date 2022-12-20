/* eslint-disable n/no-callback-literal */
const decodeResult = (api, result) => {
  let { dispatchInfo, dispatchError, events = [] } = result;
  const success = !dispatchError;
  let error;
  if (dispatchError) {
    if (dispatchError.isModule) {
      // for module errors, we have the section indexed, lookup
      const decoded = api.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = decoded;

      error = new Error(`${section}.${name}: ${docs?.join(' ')}`);
    } else {
      // Other, CannotLookup, BadOrigin, no extra info
      error = new Error(dispatchError.toString());
    }
  }
  events = events.filter(
    ({ event }) => !api?.events.system.ExtrinsicFailed.is(event)
  );
  events.forEach(({ phase, event: { data, method, section } }) => {
    console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
  });
  return { success, events, error };
};

export const signAndSendTx = async (api, tx, signingAccount) => {
  const { pairOrAddress, signer } = signingAccount;
  return new Promise((resolve, reject) => {
    const cb = ({ success, events, error }) => {
      if (!success) {
        reject(error);
      }
      resolve(events);
    };
    const signAndSendAsync = async () => {
      try {
        await tx.signAsync(pairOrAddress, { signer });
        const unsub = await tx.send((callResult) => {
          const { status, ...result } = callResult;
          if (status.isInBlock) {
            const dispatchResult = decodeResult(api, result);
            console.log(
              `Transaction ${
                tx.meta.name
              }(${tx.args.toString()}) included at blockHash ${
                status.asInBlock
              } [success = ${dispatchResult.success}]`
            );
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
      } catch (err) {
        // the call has failed off chain with an error
        cb({ success: false, events: [], error: err });
      }
    };
    return signAndSendAsync();
  });
};
