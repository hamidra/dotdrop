import config from '../config';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

const loadBalance = (api, state, dispatch, { address }) => {
  // balances should only be loaded once, and then updates are happened through subscription
  // check if not already subscribed for that address
  if (!(address in state.balances)) {
    state.api.query.system.account(address, ({ data: balance }) => {
      dispatch({ type: 'BALANCE_UPDATE', payload: { address, balance } });
    });
  }
};

export const loadExtension = async (state, dispatch, chainInfo) => {
  const { api, keyring } = state;
  // load extension only once, when api and keyring-ui are ready
  if (
    state.apiState === 'READY' &&
    state.keyringState === 'READY' &&
    !state.extensionState
  ) {
    try {
      dispatch({ type: 'LOAD_EXTENSION' });
      const injectedExt = await web3Enable(config.APP_NAME);
      console.log(injectedExt);
      const extAccounts = await web3Accounts();

      console.log(extAccounts);
      // toDO: subscribe to extension account updates
      const loadedAddresses = keyring
        .getAccounts()
        .map((account) => account.address);
      const loadedSet = new Set(loadedAddresses);

      // filter the extension accounts that are not already loaded,
      // and either don't have geneisHash(open for all chains)
      // or their genesisHash matches with the current network
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
        // load the balance for the new pair
        loadBalance(api, state, dispatch, pair);
      }
      dispatch({ type: 'SET_EXTENSION' });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'EXTENSION_ERROR' });
    }
  }
};
