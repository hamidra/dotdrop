import config from '../config';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

export const loadExtension = async (state, dispatch, chainInfo) => {
  const { api, keyring } = state;
  if (
    state.apiState === 'READY' &&
    state.keyringState === 'READY' &&
    !state.extensionState
  ) {
    try {
      dispatch({ type: 'LOAD_EXTENSION' });
      const injectedExt = await web3Enable(config.APP_NAME);
      console.log(injectedExt);
      let extAccounts = await web3Accounts();

      // filter the accounts that are enabled for the network
      extAccounts = extAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name}` },
      }));
      console.log(extAccounts);
      // toDO: subscribe to extension account updates
      const loadedAddresses = keyring
        .getAccounts()
        .map((account) => account.address);
      const loadedSet = new Set(loadedAddresses);
      const newAccounts = extAccounts.filter(
        (account) =>
          !loadedSet.has(account.address) &&
          (!account.meta?.genesisHash ||
            account.meta?.genesisHash === chainInfo?.genesisHash?.toHex())
      );
      console.log(newAccounts);
      for (const account of newAccounts) {
        const injectedAcct = {
          address: account.address,
          meta: {
            ...account.meta,
            isInjected: true,
          },
          type: account.type,
        };
        const pair = keyring.keyring.addFromAddress(
          injectedAcct.address,
          injectedAcct.meta,
          null,
          injectedAcct.type
        );
        keyring.addPair(pair);
      }
      dispatch({ type: 'SET_EXTENSION' });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'EXTENSION_ERROR' });
    }
  }
};
