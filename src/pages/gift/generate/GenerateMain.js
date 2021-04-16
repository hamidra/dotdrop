import { createContext, useState, useCallback } from 'react';
import GenerateGift from './GenerateGift';
import PresentGift from './PresentGift';
import ImportAccount from '../../../components/account/ImportAccount';
import ExtensionAccount from '../../../components/account/ExtensionAccount';
import HardwalletAccount from '../../../components/account/HardwalletAccount';
import SignerAccount from '../../../components/account/SignerAccount';
import { useSubstrate, giftPallet } from '../../../substrate-lib';
import { QRSigner } from '../../../substrate-lib/components';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import ParityQRSigner from '../../../components/ParityQRSigner';
import { web3FromSource } from '@polkadot/extension-dapp';
import SelectAccountSource from './SelectAccountSource';

const GenerateContext = createContext();
export { GenerateContext };

export default function GenerateMain() {
  const { apiState, api, keyring } = useSubstrate();
  const { removeGift, createGift } = giftPallet;
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(null);
  const [accountSource, setAccountSource] = useState(null);
  const [showSigner, setShowSigner] = useState(false);

  const [
    { isQrHashed, qrAddress, qrPayload, qrResolve },
    setQrState,
  ] = useState({
    isQrHashed: false,
    qrAddress: '',
    qrPayload: new Uint8Array(),
  });

  const [gift, setGift] = useState(null);

  const nextStep = () => {
    console.log(`${step}=>${step + 1}`);
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  let qrId = 0;
  const _addQrSignature = useCallback(
    ({ signature }) => {
      qrResolve &&
        qrResolve({
          id: ++qrId,
          signature,
        });
      setShowSigner(false);
      nextStep();
    },
    [qrResolve]
  );

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
      let senderAccount = account;
      let signer = null;
      const isQR = false;

      // load sender account
      if (account?.meta?.isExternal) {
        // it is an external account / needs QRSigner
        senderAccount = account.address;
        signer = new QRSigner(api.registry, setQrState);
      } else if (account?.meta?.isInjected) {
        senderAccount = account.address;
        const injector = await web3FromSource(account.meta.source);
        signer = injector?.signer;
      }

      // generate mnemonic and interim recipiant account
      const mnemonic = mnemonicGenerate();
      const recipiantName = giftInfo.name;
      const recipiantAccount = keyring.createFromUri(
        mnemonic,
        { name: recipiantName },
        'sr25519'
      );
      const gift = {
        to: recipiantAccount,
        amount: giftInfo.amount,
        pairOrAddress: senderAccount,
        signer,
      };

      createGift(api, gift);

      setGift({
        secret: mnemonic,
        name: giftInfo.name || '',
        email: giftInfo.email || '',
        amount: giftInfo.amount,
      });

      // ToDO: make it sync by showing a spinner while the gift is being registered on chain before moving to the next step!
      if (account?.meta?.isExternal) {
        setShowSigner(true);
      } else {
        nextStep();
      }
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
    IMPORTED_ACCOUNT: <ImportAccount />,
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
      if (showSigner) {
        currentComponent = (
          <ParityQRSigner
            address={qrAddress}
            genesisHash={api.genesisHash}
            isHashed={isQrHashed}
            onSignature={_addQrSignature}
            payload={qrPayload}
          />
        );
      } else {
        currentComponent = (
          <GenerateGift
            account={account}
            generateGiftHandler={generateGiftHandler}
          />
        );
      }
      break;
    case 3:
      currentComponent = (
        <PresentGift gift={gift} removeGiftHandler={removeGiftHandler} />
      );
      break;
    default:
      currentComponent = <SelectAccountSource />;
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
