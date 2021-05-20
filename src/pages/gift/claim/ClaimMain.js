import { createContext, useState, createElement } from 'react';
import { utils, giftPallet, useSubstrate } from '../../../substrate-lib';
import Claimed from './Claimed';
import VerifySecret from './VerifySecret';
import ErrorModal from '../../../components/Error';
import Processing from '../../../components/Processing';

import Landing from './Landing';
import Header from '../Header';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NewAccountMain from './new-account/NewAccountMain';
import ExistingAccountMain from './existing-account/ExistingAccountMain';
import Confetti from 'react-confetti';

const ClaimContext = createContext();

export { ClaimContext };
export default function ClaimMain() {
  const { keyring, apiState, api, chainInfo } = useSubstrate();
  const { claimGift } = giftPallet;

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

  const claimGiftCallback = ({ error, result }) => {
    if (error) {
      handleError(error);
    } else {
      const { events } = result;
      const giftClaimedEvent = events.filter(({ event }) =>
        api?.events?.gift?.GiftClaimed?.is(event)
      );
      const {
        event: { data },
      } = giftClaimedEvent[0];
      let claimedAmount = data && data[1].toString();
      claimedAmount = utils.fromChainUnit(claimedAmount, chainInfo.decimals);
      setClaimedAmount(claimedAmount);
      nextStep();
    }
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
      const giftAccount = keyring.createFromUri(
        mnemonic,
        { name: 'interim_gift' },
        'sr25519'
      );

      // set the gift account as signing account
      const signingAccount = { pairOrAddress: giftAccount };

      // claim gift by the selected account
      const claim = {
        by: address,
      };

      claimGift(api, signingAccount, claim, claimGiftCallback);

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
  steps.push(<Landing setAccountSourceHandler={setAccountSourceHandler} />);

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
          <Col className="my-md-5 d-flex justify-content-center align-items-center">
            <Card
              style={{ width: 650, maxWidth: '100%', minHeight: 500 }}
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
