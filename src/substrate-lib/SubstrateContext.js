import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import queryString from 'query-string';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

import keyring from '@polkadot/ui-keyring';

import config from '../config';

const parsedQuery = queryString.parse(window.location.search);
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);

///
// Initial state for `useReducer`

const INIT_STATE = {
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.RPC },
  types: config.types,
  keyring: null,
  keyringState: null,
  balances: null,
  api: null,
  apiError: null,
  apiState: null,
  chainInfo: null,
};

///
// Reducer function for `useReducer`

const reducer = (state, action) => {
  let api;
  let chainInfo;
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' };

    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' };

    case 'CONNECT_SUCCESS':
      api = action.payload;
      chainInfo = {
        decimals: api.registry?.chainDecimals[0] || 12,
        token: api.registry?.chainTokens[0] || 'DOT',
        genesisHash: api.genesisHash,
        ss58Format: api.registry?.chainSS58 || 42,
        existentialDeposit: api.consts?.balances?.existentialDeposit || 0,
      };

      // ToDo: remove this when the pallet is deployed on polkadot
      // default substrate token to Dot for demo pupose
      if (chainInfo?.token === 'Unit') {
        chainInfo.token = 'Dot';
      }
      console.log(chainInfo);
      return { ...state, apiState: 'READY', chainInfo: chainInfo };

    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload };

    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' };

    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' };

    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' };

    case 'BALANCE_UPDATE':
      const { address, balance } = action.payload;
      return { ...state, balances: { ...state?.balances, [address]: balance } };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// Connecting to the Substrate node

const connect = (state, dispatch) => {
  try {
    const { apiState, socket, jsonrpc, types } = state;
    // We only want this function to be performed once
    if (apiState) return;
    dispatch({ type: 'CONNECT_INIT' });

    const provider = new WsProvider(socket);
    const _api = new ApiPromise({ provider, types, rpc: jsonrpc });

    // Set listeners for disconnection and reconnection event.
    _api.on('connected', () => {
      dispatch({ type: 'CONNECT', payload: _api });
      // `ready` event is not emitted upon reconnection and is checked explicitly here.
      _api.isReady.then((_api) =>
        dispatch({ type: 'CONNECT_SUCCESS', payload: _api })
      );
    });
    _api.on('ready', () =>
      dispatch({ type: 'CONNECT_SUCCESS', payload: _api })
    );
    _api.on('error', (err) =>
      dispatch({ type: 'CONNECT_ERROR', payload: err })
    );
  } catch (err) {
    console.error(err);
    dispatch({ type: 'CONNECT_ERROR', payload: err });
  }
};

///
// Loading accounts from dev and polkadot-js extension

let loadAccts = false;
const loadAccounts = (state, dispatch) => {
  const asyncLoadAccounts = async () => {
    dispatch({ type: 'LOAD_KEYRING' });
    try {
      const injectedExt = await web3Enable(config.APP_NAME);
      console.log(injectedExt);
      let allAccounts = await web3Accounts();

      // filter the accounts that are enabled for the network
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name}` },
      }));

      // toDO: subscribe to extension account updates
      keyring.loadAll(
        {
          genesisHash: state.chainInfo.genesisHash,
          isDevelopment: config.DEVELOPMENT_KEYRING,
          ss58Format: state.chainInfo.ss58Format,
        },
        allAccounts
      );

      dispatch({ type: 'SET_KEYRING', payload: keyring });
    } catch (e) {
      console.error(e);
      dispatch({ type: 'KEYRING_ERROR' });
    }
  };
  const { keyringState } = state;
  // If `keyringState` is not null `asyncLoadAccounts` is running.
  if (keyringState) return;
  // If `loadAccts` is true, the `asyncLoadAccounts` has been run once.
  if (loadAccts) return dispatch({ type: 'SET_KEYRING', payload: keyring });

  // This is the heavy duty work
  loadAccts = true;
  asyncLoadAccounts();
};

let isLoadingBalances = false;
const loadBalances = (state, dispatch) => {
  // balances should only be loaded once, and then updates are happened through subscription
  if (!isLoadingBalances) {
    isLoadingBalances = true;
    // get the balance for all addresses in keyring:
    state.keyring.getAccounts().forEach(({ address }) => {
      state.api.query.system.account(address, ({ data: balance }) => {
        dispatch({ type: 'BALANCE_UPDATE', payload: { address, balance } });
      });
    });
  }
};

const SubstrateContext = React.createContext();

const SubstrateContextProvider = (props) => {
  // filtering props and merge with default param value
  const initState = { ...INIT_STATE };
  const neededPropNames = ['socket', 'types'];
  neededPropNames.forEach((key) => {
    initState[key] =
      typeof props[key] === 'undefined' ? initState[key] : props[key];
  });

  const [state, dispatch] = useReducer(reducer, initState);
  connect(state, dispatch);

  // load accounts when api is ready
  if (state.apiState === 'READY') {
    loadAccounts(state, dispatch);
  }

  if (state.apiState === 'READY' && state.keyringState === 'READY') {
    loadBalances(state, dispatch);
  }
  console.log(state);
  return (
    <SubstrateContext.Provider value={state}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

// prop typechecking
SubstrateContextProvider.propTypes = {
  socket: PropTypes.string,
  types: PropTypes.object,
};

const useSubstrate = () => ({ ...useContext(SubstrateContext) });

export { SubstrateContextProvider, useSubstrate };
