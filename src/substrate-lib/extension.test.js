import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { injectedExtensionInfo, injectedAccountWithMeta } from './mockData';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise } from '@polkadot/api';
import uiKeyring from '@polkadot/ui-keyring';
import Keyring from '@polkadot/Keyring';
import { loadExtension } from './extension';
import { BN } from 'bn.js';

jest.mock('@polkadot/extension-dapp');
jest.mock('@polkadot/ui-keyring');
jest.mock('@polkadot/api');

describe('test loading extension', () => {
  beforeEach(() => {
    web3Enable.mockResolvedValue([injectedExtensionInfo]);
    web3Accounts.mockResolvedValue(injectedAccountWithMeta);
  });
  it('load injected accounts', async () => {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const api = new ApiPromise();
    api.query = {
      system: {
        account: jest.fn()
      }
    };
    uiKeyring.keyring = keyring;
    const state = {
      keyring: uiKeyring,
      keyringState: 'READY',
      extensionState: null,
      api,
      apiState: 'READY'
    };
    const dispatch = jest.fn();
    await loadExtension(state, dispatch);
    expect(keyring.getPairs().length).toBe(2);
    const [pair0, pair1] = keyring.getPairs();
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_EXTENSION' });
    expect(pair0.address).toBe(injectedAccountWithMeta[0].address);
    expect(pair1.address).toBe(injectedAccountWithMeta[1].address);
  });
});
