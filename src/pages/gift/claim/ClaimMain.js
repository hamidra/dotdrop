import { createContext, useState, createElement } from 'react';
import Claimed from './Claimed';
import VerifySecret from './VerifySecret';
import NewAccount from '../../../components/account/NewAccount';
import ExtensionAccount from '../../../components/account/ExtensionAccount';
import HardwalletAccount from '../../../components/account/HardwalletAccount';
import SignerAccount from '../../../components/account/SignerAccount';
import Error from '../../../components/Error';
import Processing from '../../../components/Processing';
import SelectAccount from './SelectAccount';
import SelectAccountSource from './SelectAccountSource';
import { giftPallet, useSubstrate } from '../../../substrate-lib';

const ClaimContext = createContext();

export { ClaimContext };
export default function ClaimMain() {
  const { keyring, apiState, api } = useSubstrate();
  const { claimGift } = giftPallet;

  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(null);
  const [accountSource, setAccountSource] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [processingMsg, setProcessingMsg] = useState('');

  const resetPresentation = () => {
    setProcessing(false);
    setProcessingError(null);
  };
  const _setStep = (step) => {
    resetPresentation();
    setStep(step);
  };
  const nextStep = () => {
    _setStep(step + 1);
  };
  const prevStep = () => {
    _setStep(step - 1);
  };
  const jumpToStep = (step) => {
    _setStep(step);
  };

  const handleError = (error) => {
    setProcessing(false);
    setProcessingMsg(null);
    setProcessingError(error.message);
  };

  const claimGiftCallback = ({ error, result }) => {
    if (error) {
      handleError(error);
    } else {
      nextStep();
    }
  };

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

      // set the gift account as signing account
      const signingAccount = { pairOrAddress: giftAccount };

      // claim gift by the selected account
      const claim = {
        by: account,
      };
      claimGift(api, signingAccount, claim, claimGiftCallback);

      setProcessingMsg('Transferring yout gift to your account...');
      setProcessing(true);
    }
  };

  const setAccountHandler = (account) => {
    setAccount(account);
    nextStep();
  };

  const accountOption = {
    NEW_ACCOUNT: NewAccount,
    EXTENSION_ACCOUNT: ExtensionAccount,
    HARDWALLET_ACCOUNT: HardwalletAccount,
    SIGNER_ACCOUNT: SignerAccount,
  };

  let currentStepComponent;
  switch (step) {
    case 1:
      currentStepComponent = (
        <SelectAccount>
          {createElement(accountOption[accountSource], { setAccountHandler })}
        </SelectAccount>
      );
      break;
    case 2:
      currentStepComponent = (
        <VerifySecret claimGiftHandler={claimGiftHandler} />
      );
      break;
    case 3:
      currentStepComponent = <Claimed />;
      break;
    default:
      currentStepComponent = <SelectAccountSource />;
  }
  return (
    <ClaimContext.Provider
      value={{
        nextStep,
        prevStep,
        jumpToStep,
        setAccountSource,
      }}>
      {currentStepComponent}
      <Processing show={processing} message={processingMsg} />
      <Error
        show={!!processingError}
        message={processingError}
        handleClose={() => resetPresentation()}
      />
    </ClaimContext.Provider>
  );
}
