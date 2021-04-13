import { createContext, useState } from 'react';
import Claimed from './Claimed';
import CreateAccountOptions from './CreateAccountOptions';
import VerifySecret from './VerifySecret';
import CreateNewAccount from './CreateNewAccount';
import { usesubstrate, giftPallet, useSubstrate } from '../../../substrate-lib';

const ClaimContext = createContext();

export { ClaimContext };
export default function ClaimMain() {
  const { keyring, apiState, api } = useSubstrate();
  const { claimGift } = giftPallet;

  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(null);
  const [accountSource, setAccountSource] = useState(null);

  const claimGiftHandler = async (secret) => {
    if (apiState !== 'READY') {
      console.log('api not READY!' + apiState);
      window.alert(
        'We were not able to connect to the blockchain!\nPlease Check if you have set the correct rpc address for the chain and in case you are using any adblockers make sure it is turned off!'
      );
    } else if (!account) {
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
        'sr25519'
      );

      // load login account to transfer the gift to
      const toAccount = account;

      const claim = {
        giftAccount,
        toAccount,
      };
      claimGift(api, claim);

      nextStep();
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const accountOption = {
    NEW_ACCOUNT: <CreateNewAccount />,
  };
  let currentComponent = <CreateAccountOptions />;
  switch (step) {
    case 1:
      currentComponent = accountOption[accountSource];
      break;
    case 2:
      currentComponent = <VerifySecret claimGiftHandler={claimGiftHandler} />;
      break;
    case 3:
      currentComponent = <Claimed />;
      break;
    default:
      currentComponent = <CreateAccountOptions />;
  }
  return (
    <ClaimContext.Provider
      value={{
        nextStep,
        prevStep,
        setAccount,
        setAccountSource,
      }}>
      {currentComponent}
    </ClaimContext.Provider>
  );
}
