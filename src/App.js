import { React, useState, useEffect } from 'react';
import { Grommet, grommet, Box, Button, Text } from 'grommet';
import PageHeader from './PageHeader';
import First from './pages/first';
import Second from './pages/second';

import { mnemonicGenerate } from '@polkadot/util-crypto';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

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
    const unsub = await api.tx.gift
      .gift(amount, to.address)
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

  const generateGiftHandler = async (giftInfo) => {
    if (!loginAccount) {
      console.log('no account is selected');
    } else if (apiState === 'READY') {
      // load sender account
      const senderAccount = await keyring.getPair(loginAccount);

      // generate mnemonic and interim recipiant account
      const mnemonic = mnemonicGenerate();
      const recipiantName = giftInfo.name;
      const { pair } = keyring.addUri(
        mnemonic,
        null,
        { name: recipiantName },
        'ed25519'
      );
      const recipiantAccount = pair;
      const gift = {
        from: senderAccount,
        to: recipiantAccount,
        amount: giftInfo.amount,
      };

      createGift(gift);

      setGiftInfo({
        secret: mnemonic,
        name: giftInfo.name,
        email: giftInfo.email,
        amount: giftInfo.amount,
      });
      setShowGift(true);
    } else {
      console.log('api not READY!' + apiState);
    }
  };

  function loginHandler(accountAddr) {
    setLoginAccount({ addr: accountAddr });
  }

  return (
    <div>
      <Grommet theme={grommet}>
        <Box>
          <PageHeader loginHandler={setLoginAccount} />
          {!showGift ? (
            <First generateGiftHandler={generateGiftHandler} />
          ) : (
            <Second />
          )}
        </Box>
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
