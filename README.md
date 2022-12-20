# Substrate Gifts

Substrate Gifts is a dapp (decentralized app) built on top of substrate compatible networks to let the users of any substrate based network send tokens as a gift no matter if the recepient has any accounts in the network or not. The sender of a gift can simply wrap their tokens (KSMs, DOTs, etc) as a gift in a unique secret hash that functions as a voucher and share the gift secret with the recipient (through email, message or just simply write it on a paper), while the recipient of the gift can go to the dapp and reveal the recieved voucher (gift secret) to redeem their gifted tokens to their account. If the recipient has no accounts in the network to redeem their gift, the dapp will walk them through account creation steps to let them create an account before redeeming their gift.

## Running Substrate Gifts dapp

### Requirements

- [node.js version >=14](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/)
- a [substrate node](https://github.com/substrate-developer-hub/substrate-node-template) or network(e.x. polkadot, kusama) for the gift dapp to connect to.

### Installation

The codebase is installed using [git](https://git-scm.com/) and [yarn](https://yarnpkg.com/). This assumes you have installed yarn globally prior to installing it within the subdirectories. For the most recent version and how to install yarn, please refer to [yarn](https://yarnpkg.com/) documentation and installation guides.

```bash
# Clone the repository
git clone https://github.com/hamidra/dotdrop.git
cd dotdrop
yarn install
```

## Usage

You can start the dapp in development mode to connect to a locally running node.

```bash
yarn start
```

You can also build the app in production mode,

```bash
yarn build
```

and host the `build/` folder using any webserver. refer to [create react app] (https://create-react-app.dev/docs/deployment) documentations for more info

## Configuration

The dapps configuration is stored in the `src/config` directory, with
`common.json` being loaded first, then the environment-specific json file,
and finally environment variables, with precedence.

- `development.json` affects the development environment
- `test.json` affects the test environment, triggered in `yarn test` command.
- `production.json` affects the production environment, triggered in `yarn build` command.

Some environment variables are read and integrated in the template `config` object,
including:

- `REACT_APP_PROVIDER_SOCKET` overriding `config[PROVIDER_SOCKET]`
- `REACT_APP_DEVELOPMENT_KEYRING` overriding `config[DEVELOPMENT_KEYRING]`

More on [React environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables).

When writing and deploying your own dapp, you should configure:

- Custom types as JSON in `src/config/types.json`. See
  [Extending types](https://polkadot.js.org/api/start/types.extend.html).
- `PROVIDER_SOCKET` in `src/config/production.json` pointing to your own
  deployed node.
- `DEVELOPMENT_KEYRING` in `src/config/common.json` be set to `false` if you don't want to load the keyrings usual suspects (Alice, Bob, ...) as test accounts.
  See [Keyring](https://polkadot.js.org/api/start/keyring.html).

### Specifying Connecting Node

There are two ways to specify it:

- With `PROVIDER_SOCKET` in `{common, development, production}.json`.
- With `rpc=<ws or wss connection>` query paramter after the URL. This overrides the above setting.

## Reusable Components

### useSubstrate Custom Hook

The custom hook `useSubstrate` provides access to the Polkadot js API and thus the
keyring and the blockchain itself. Specifically it exposes this API.

```js
{
  socket,
  types,
  keyring,
  keyringState,
  api,
  apiError,
  apiState,
  chainInfo,
}
```

- `socket` - The remote provider socket it is connecting to.
- `types` - The custom types used in the connected node.
- `keyring` - A keyring of accounts available to the user.
- `keyringState` - One of `"READY"` or `"ERROR"` states. `keyring` is valid
  only when `keyringState === "READY"`.
- `api` - The remote api to the connected node.
- `apiState` - One of `"CONNECTING"`, `"READY"`, or `"ERROR"` states. `api` is valid
  only when `apiState === "READY"`.
- `apiError` - the api error if any has happened during connecting to the chain Api
- `chainInfo` - the chain information that are configured for the network including _chainDecimals_, _chainTokens_, _genesisHash_, _chainSS58_ address type and _existentialDeposit_
