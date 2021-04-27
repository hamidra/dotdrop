import { React, useState, useEffect } from 'react';
import {
  Grommet,
  ThemeContext,
  grommet,
  Box,
  Layer,
  Card,
  CardBody,
  CardHeader,
} from 'grommet';
import PageHeader from './PageHeader';
import First from './pages/first';
import Second from './pages/second';

import { mnemonicGenerate } from '@polkadot/util-crypto';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';
import BN from 'bn.js';

import { FormClose } from 'grommet-icons';

const unitConst = new BN('1000000000000', 10);
const ChainMeta = () => {
  const { api, apiState, keyring, keyringState, apiError } = useSubstrate();
  if (apiState === 'ERROR') return <div>apiError</div>;
  else if (apiState !== 'READY') return <div>"Connecting to Substrate"</div>;

  if (keyringState !== 'READY') {
    return (
      <div>
        "Loading accounts (please review any extension's authorization)"
      </div>
    );
  }

  return (
    <div>
      <p>
        <pre>
          {JSON.stringify(api.runtimeMetadata.asLatest.toHuman(), null, 2)}
        </pre>
      </p>
      <DeveloperConsole />
    </div>
  );
};

function Body() {
  const { api, apiState, keyring, keyringState, apiError } = useSubstrate();
  const [giftInfo, setGiftInfo] = useState(null);
  const [showGift, setShowGift] = useState(false);
  const [loginAccount, setLoginAccount] = useState('');

  const createGift = async ({ from, to, amount }) => {
    console.log(
      `Sending a gift from ${from.address} to ${to.address} of amount of ${amount}`
    );
    const bnAmount = new BN(amount, 10);
    const chainAmount = bnAmount.mul(unitConst);
    const unsub = await api.tx.gift
      .gift(chainAmount.toString(), to.address)
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

  const claimGift = async ({ giftAccount, toAccount }) => {
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

  const removeGift = async ({ fromAccount, giftAccount }) => {
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

  const generateGiftHandler = async (giftInfo) => {
    if (apiState !== 'READY') {
      console.log('api not READY!' + apiState);
      window.alert(
        'We were not able to connect to the blockchain!\nPlease Check if you have set the correct rpc address for the chain and in case you are using any adblockers make sure it is turned off!'
      );
    } else if (!loginAccount) {
      console.log('no account is selected');
      window.alert(
        'You need to sign in with your account to be able to send a gift 🔑🔓'
      );
    } else {
      // load sender account
      const senderAccount = await keyring.getPair(loginAccount);

      // generate mnemonic and interim recipiant account
      const mnemonic = mnemonicGenerate();
      const recipiantName = giftInfo.name;
      const recipiantAccount = keyring.createFromUri(
        mnemonic,
        { name: recipiantName },
        'ed25519'
      );
      const gift = {
        from: senderAccount,
        to: recipiantAccount,
        amount: giftInfo.amount,
      };

      createGift(gift);

      setGiftInfo({
        secret: mnemonic,
        name: giftInfo.name || '',
        email: giftInfo.email || '',
        amount: giftInfo.amount,
      });
      setShowGift(true);
    }
  };

  const claimGiftHandler = async (secret) => {
    if (apiState !== 'READY') {
      console.log('api not READY!' + apiState);
      window.alert(
        'We were not able to connect to the blockchain!\nPlease Check if you have set the correct rpc address for the chain and in case you are using any adblockers make sure it is turned off!'
      );
    } else if (!loginAccount) {
      console.log('no account is selected');
      window.alert(
        'You need to sign in with your account to be able to send a gift 🔑🔓'
      );
    } else {
      // retrive gift account from secret
      const mnemonic = secret;
      const giftAccount = keyring.createFromUri(
        mnemonic,
        { name: 'interim_gift' },
        'ed25519'
      );

      // load login account to transfer the gift to
      const toAccount = await keyring.getPair(loginAccount);

      const claim = {
        giftAccount,
        toAccount,
      };
      claimGift(claim);
    }
  };

  const removeGiftHandler = async (secret) => {
    if (apiState !== 'READY') {
      console.log('api not READY!' + apiState);
      window.alert(
        'We were not able to connect to the blockchain!\nPlease Check if you have set the correct rpc address for the chain and in case you are using any adblockers make sure it is turned off!'
      );
    } else if (!loginAccount) {
      console.log('no account is selected');
      window.alert(
        'You need to sign in with your account to be able to send a gift 🔑🔓'
      );
    } else {
      // retrive gift account from secret
      const mnemonic = secret;
      const giftAccount = keyring.createFromUri(
        mnemonic,
        { name: 'interim_gift' },
        'ed25519'
      );

      // load sender account
      const fromAccount = await keyring.getPair(loginAccount);

      const gift = {
        giftAccount,
        fromAccount,
      };
      removeGift(gift);

      setShowGift(false);
    }
  };

  function loginHandler(accountAddr) {
    setLoginAccount({ addr: accountAddr });
  }

  return (
    <div>
      <Grommet theme={grommet}>
        <ThemeContext.Extend
          value={{
            global: {
              colors: { brand: '#e6007a' },
            },
          }}>
          <Box>
            <PageHeader loginHandler={setLoginAccount} />
            {!showGift && (
              <First
                generateGiftHandler={generateGiftHandler}
                claimGiftHandler={claimGiftHandler}
              />
            )}
            {showGift && (
              <Layer
                onEsc={() => setShowGift(false)}
                onClickOutside={() => setShowGift(false)}
                animate="false">
                <Box height="3rem" direction="row" justify="end" pad="small">
                  <FormClose onClick={() => setShowGift(false)} />
                </Box>
                <Second
                  {...giftInfo}
                  removeGiftHandler={removeGiftHandler}
                  closeHandler={() => setShowGift(false)}
                />
              </Layer>
            )}
          </Box>
        </ThemeContext.Extend>
      </Grommet>
      <DeveloperConsole />
    </div>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Body />
    </SubstrateContextProvider>
  );
}
