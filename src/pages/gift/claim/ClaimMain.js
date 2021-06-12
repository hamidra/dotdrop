import { createContext, useState, createElement } from 'react';
import { utils, giftProvider, useSubstrate } from '../../../substrate-lib';
import Claimed from './Claimed';
import VerifySecret from './VerifySecret';
import ErrorModal from '../../../components/Error';
import Processing from '../../../components/Processing';

import ConnectAccount from './ConnectAccount';
import Header from '../Header';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NewAccountMain from './new-account/NewAccountMain';
import ExistingAccountMain from './existing-account/ExistingAccountMain';
import Confetti from 'react-confetti';

const ClaimContext = createContext();

export { ClaimContext };
export default function ClaimMain() {
  const { keyring, apiState, api, chainInfo } = useSubstrate();
  const { claimGift } = giftProvider;

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState(null);
  const [accountSource, setAccountSource] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [processingMsg, setProcessingMsg] = useState('');
  const [claimedAmount, setClaimedAmount] = useState('');

  const resetPresentation = () => {
    setProcessing(false);
    setProcessingError(null);
  };
  const _setStep = (step) => {
    resetPresentation();
    setStep(step % steps.length);
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

  const claimGiftHandler = async (secret) => {
    if (apiState !== 'READY') {
      console.log('api not READY!' + apiState);
      window.alert(
        'We were not able to connect to the blockchain!\nPlease Check if you have set the correct rpc address for the chain and in case you are using any adblockers make sure it is turned off!'
      );
    } else if (!address) {
      console.log('no account is selected');
      window.alert(
        'You need to sign in with your account to be able to send a gift 🔑🔓'
      );
    } else {
      // retrive gift account from secret
      const mnemonic = secret;
      const giftAccountPair = keyring.createFromUri(
        mnemonic,
        { name: 'interim_gift' },
        'sr25519'
      );

      // set the gift account as signing account
      const interimAccount = { pairOrAddress: giftAccountPair };

      // claim gift by the selected account
      const recipientAccount = {
        pairOrAddress: address,
      };

      claimGift(api, interimAccount, recipientAccount)
        .then((claimedAmount) => {
          /* claimedAmount = utils.fromChainUnit(
            claimedAmount,
            chainInfo.decimals
          );
          setClaimedAmount(claimedAmount); */
          nextStep();
        })
        .catch((error) => {
          handleError(error);
        });

      setProcessingMsg('Transferring your gift to your account...');
      setProcessing(true);
    }
  };

  const setAccountSourceHandler = (accountSource) => {
    setAccountSource(accountSource);
    nextStep();
  };

  const setAddressHandler = (account) => {
    if (account) {
      setAddress(account);
      nextStep();
    } else {
      handleError(
        new Error('No account was selected, please login with your account!')
      );
    }
  };

  const accountOption = {
    NEW: NewAccountMain,
    EXISTING: ExistingAccountMain,
  };

  if (step < 1 && address) {
    setAddress(null);
  }
  const steps = [];
  // Step-0
  steps.push(
    <ConnectAccount setAccountSourceHandler={setAccountSourceHandler} />
  );

  // Step-1
  const AccountOptionElement = accountOption[accountSource] ? (
    createElement(accountOption[accountSource], {
      setAddressHandler: setAddressHandler,
      prevStepHandler: () => {
        prevStep();
      },
    })
  ) : (
    <div>No account type is selected</div>
  );
  steps.push(AccountOptionElement);

  // Step-2
  steps.push(<VerifySecret claimGiftHandler={claimGiftHandler} />);

  // Step-3
  steps.push(<Claimed accountAddress={address} amount={claimedAmount} />);

  const currentStepComponent = steps[step];

  return (
    <ClaimContext.Provider
      value={{
        nextStep,
        prevStep,
        jumpToStep,
      }}>
      <Header selectedAccount={address} />
      {step === 3 && <Confetti />}
      <Container>
        <Row className="my-2 my-md-5 justify-content-center align-items-center">
          <Col className="my-md-3 d-flex justify-content-center align-items-center">
            <Card
              style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
              className="shadow">
              {currentStepComponent}
            </Card>
          </Col>
        </Row>
      </Container>
      <ErrorModal
        show={!!processingError}
        message={processingError}
        handleClose={() => resetPresentation()}
      />
      <Processing
        show={!processingError && processing}
        message={processingMsg}
      />
    </ClaimContext.Provider>
  );
}
