import { createContext, useState } from 'react';
import GenerateGift from './GenerateGift';
import PresentGift from './PresentGift';
import LoadAccountOptions from './LoadAccountOptions';
import ImportedAccount from './account-options/ImportedAccount';
import ExtensionAccount from './account-options/ExtensionAccount';
import HardwalletAccount from './account-options/HardwalletAccount';
import SignerAccount from './account-options/SignerAccount';
import { useSubstrate, giftPallet } from '../../../substrate-lib';
import { mnemonicGenerate } from '@polkadot/util-crypto';

const GenerateContext = createContext();
export { GenerateContext };

export default function GenerateMain() {
  const { apiState, api, keyring } = useSubstrate();
  const { removeGift, createGift } = giftPallet;
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(null);
  const [accountSource, setAccountSource] = useState(null);
  const [gift, setGift] = useState(null);

  const nextStep = () => {
    console.log(`${step}=>${step + 1}`);
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const generateGiftHandler = async (giftInfo) => {
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
      // load sender account
      const senderAccount = account;

      // generate mnemonic and interim recipiant account
      const mnemonic = mnemonicGenerate();
      const recipiantName = giftInfo.name;
      const recipiantAccount = keyring.createFromUri(
        mnemonic,
        { name: recipiantName },
        'sr25519'
      );
      const gift = {
        from: senderAccount,
        to: recipiantAccount,
        amount: giftInfo.amount,
      };

      createGift(api, gift);

      setGift({
        secret: mnemonic,
        name: giftInfo.name || '',
        email: giftInfo.email || '',
        amount: giftInfo.amount,
      });

      // ToDO: make it sync by showing a spinner while the gift is being registered on chain before moving to the next step!
      nextStep();
    }
  };

  const removeGiftHandler = async (secret) => {
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

      // load sender account
      const fromAccount = account;

      const gift = {
        giftAccount,
        fromAccount,
      };
      removeGift(api, gift);

      // go to generate gift
      setStep(2);
    }
  };

  const accountOption = {
    IMPORTED_ACCOUNT: <ImportedAccount />,
    EXTENSION_ACCOUNT: <ExtensionAccount />,
    HARDWALLET_ACCOUNT: <HardwalletAccount />,
    SIGNER_ACCOUNT: <SignerAccount />,
  };
  let currentComponent;
  switch (step) {
    case 1:
      currentComponent = accountOption[accountSource];
      break;
    case 2:
      currentComponent = (
        <GenerateGift
          account={account}
          generateGiftHandler={generateGiftHandler}
        />
      );
      break;
    case 3:
      currentComponent = (
        <PresentGift gift={gift} removeGiftHandler={removeGiftHandler} />
      );
      break;
    default:
      currentComponent = <LoadAccountOptions />;
  }
  return (
    <GenerateContext.Provider
      value={{
        nextStep,
        prevStep,
        setAccount,
        setAccountSource,
        setGift,
      }}>
      {currentComponent}
    </GenerateContext.Provider>
  );
}
