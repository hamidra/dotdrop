import { createContext, useState, createElement } from 'react';
import { utils, giftProvider, useSubstrate } from '../../../substrate-lib';
import Claimed from './Claimed';
import VerifySecret from './VerifySecret';
import ErrorModal from '../../../components/Error';
import Processing from '../../../components/Processing';

import ConnectAccount from './ConnectAccount';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NewAccountMain from './new-account/NewAccountMain';
import ExistingAccountMain from './existing-account/ExistingAccountMain';
import analytics from '../../../analytics';
/* import Confetti from 'react-confetti'; */

const ClaimContext = createContext();
const balanceDecimalPoints = 5;

export { ClaimContext };
export default function ClaimMain () {
  const { keyring, apiState, api, chainInfo, giftTheme } = useSubstrate();
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
    } else if (!address) {
      console.log('no account is selected');
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
        pairOrAddress: address
      };

      claimGift(api, interimAccount, recipientAccount)
        .then((claimedGift) => {
          console.log(claimedGift);
          // currently only show the balance amount in the claimed page. When we support NFTs and Assets we can change to show them too.
          let claimedAmount = claimedGift?.balances?.[0];
          claimedAmount =
            claimedAmount &&
            utils.fromChainUnit(
              claimedAmount,
              chainInfo?.decimals,
              balanceDecimalPoints
            );
          setClaimedAmount(claimedAmount);
          console.log(`claimed amount: ${claimedAmount}`);
          analytics.track('claim_suceeded');
          nextStep();
        })
        .catch((error) => {
          analytics.track('claim_failed');
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
    EXISTING: ExistingAccountMain
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
  const AccountOptionElement = accountOption[accountSource]
    ? (
        createElement(accountOption[accountSource], {
          setAddressHandler,
          prevStepHandler: () => {
            prevStep();
          }
        })
      )
    : (
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
        jumpToStep
      }}>
      <Header selectedAccount={address} />
      {/* {step === 3 && <Confetti />} */}
      <Container>
        <Row className="my-2 my-md-5 justify-content-center align-items-center">
          <Col className="my-md-3 d-flex justify-content-center align-items-center">
            {step === 0 && giftTheme.network === 'Polkadot' && (
              <div className="landingpage">{currentStepComponent}</div>
            )}
            {step > 0 && (
              <Card
                style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
                className="shadow">
                {currentStepComponent}
              </Card>
            )}
            {step === 0 && giftTheme.network === 'Kusama' && (
              <Card
                style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
                className="shadow">
                {currentStepComponent}
              </Card>
            )}
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
      <Footer />
    </ClaimContext.Provider>
  );
}
