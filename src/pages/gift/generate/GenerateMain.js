import { createContext, useState, useCallback, createElement } from 'react';
import GenerateGift from './GenerateGift';
import PresentGift from './PresentGift';
import ConnectExtension from '../accounts/ConnectExtension';
import LedgerMain from '../accounts/LedgerWallet/LedgerMain';
import ConnectSigner from '../accounts/ConnectSigner';
import Processing from '../../../components/Processing';
import ErrorModal from '../../../components/Error';
import { useSubstrate, giftProvider, utils } from '../../../substrate-lib';
import { QRSigner } from '../../../substrate-lib/components';
import { randomAsHex } from '@polkadot/util-crypto';
import BN from 'bn.js';
import ParityQRSigner from '../ParityQRSigner';
import { web3FromSource } from '@polkadot/extension-dapp';
import Landing from './Landing';
import { Row, Col, Card, Container } from 'react-bootstrap';
import ConnectAccount from './ConnectAccount';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ConfirmGift from './ConfirmGift';
import analytics from '../../../analytics';

const GenerateContext = createContext();
export { GenerateContext };

const generateGiftSecret = () => {
  return new BN(randomAsHex(8).slice(2), 16).toString().slice(0, 16);
};

const storeGiftInfo = (fromAccount, giftInfo) => {
  let amount = giftInfo?.amount;
  // try format gift balance
  try {
    amount = utils.formatBalance(amount);
  } catch (err) {
    console.log(err);
  }
  // store gift info in local storage
  localStorage.setItem(
    giftInfo?.secret,
    JSON.stringify({
      fromAddress: fromAccount?.address,
      ...giftInfo,
      amount
    })
  );
};

export default function GenerateMain () {
  const { apiState, api, giftTheme, keyring } = useSubstrate();
  const { removeGift, createGift, getGiftFeeMultiplier } = giftProvider;

  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(null);
  const [accountSource, setAccountSource] = useState(null);
  const [showSigner, setShowSigner] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [processingMsg, setProcessingMsg] = useState('');
  const [giftInfo, setGiftInfo] = useState(null);
  const [seed, _] = useState(generateGiftSecret());

  const [{ isQrHashed, qrAddress, qrPayload, qrResolve }, setQrState] =
    useState({
      isQrHashed: false,
      qrAddress: '',
      qrPayload: new Uint8Array()
    });

  const generateGiftAccount = (seed) => {
    const account = keyring.createFromUri(seed, null, 'sr25519');
    return account;
  };

  const resetPresentation = () => {
    setProcessing(false);
    setShowSigner(false);
    setProcessingError(null);
    setProcessingMsg('');
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

  let qrId = 0;
  const _addQrSignature = useCallback(
    ({ signature }) => {
      qrResolve &&
        qrResolve({
          id: ++qrId,
          signature
        });
      setShowSigner(false);
      setProcessing(true);
    },
    [qrResolve]
  );

  const handleError = (error) => {
    setProcessing(false);
    setProcessingMsg(null);
    setProcessingError(error.message);
  };

  const getSigningAccount = async (account) => {
    let pairOrAddress = account;
    let signer = null;
    if (account?.meta?.isExternal) {
      // it is an external account / needs QRSigner
      pairOrAddress = account.address;
      signer = new QRSigner(api.registry, setQrState);
    } else if (account?.meta?.isInjected) {
      pairOrAddress = account.address;
      const injector = await web3FromSource(account.meta.source);
      signer = injector?.signer;
    }
    return { pairOrAddress, signer };
  };

  const setGiftHandler = (giftInfo) => {
    setGiftInfo({
      secret: seed,
      name: giftInfo?.recipientName || '',
      email: giftInfo?.recipientEmail || '',
      amount: giftInfo?.amount
    });
    nextStep();
  };

  const generateGiftHandler = async () => {
    if (apiState !== 'READY') {
      console.log('api not READY!' + apiState);
    } else if (!account) {
      console.log('no account is selected');
    } else {
      // load signing account
      const senderAccount = await getSigningAccount(account);

      const gift = {
        amount: giftInfo?.amount
      };

      const interimAccount = {
        pairOrAddress: generateGiftAccount(giftInfo?.secret)
      };

      createGift(api, interimAccount, senderAccount, gift)
        .then(() => {
          storeGiftInfo(account, giftInfo);
          analytics.track('generate_succeeded');
          nextStep();
        })
        .catch((error) => {
          analytics.track('generate_failed');
          handleError(error);
        });

      // ToDO: make it sync by showing a spinner while the gift is being registered on chain before moving to the next step!
      if (account?.meta?.isExternal) {
        setShowSigner(true);
      } else {
        setProcessingMsg(`Generating the gift on ${giftTheme.network}...`);
        setProcessing(true);
      }
    }
  };

  const removeGiftHandler = async (secret) => {
    if (apiState !== 'READY') {
      console.log('api not READY!' + apiState);
    } else if (!account) {
      console.log('no account is selected');
    } else {
      // load signing account
      const senderAccount = await getSigningAccount(account);

      // retrive gift account from secret
      const mnemonic = secret;
      const giftAccountPair = keyring.createFromUri(
        mnemonic,
        { name: 'interim_gift' },
        'sr25519'
      );

      const interimAccount = {
        pairOrAddress: giftAccountPair
      };

      removeGift(api, interimAccount, senderAccount)
        .then(() => {
          setGiftInfo(null);
          localStorage.removeItem(secret);
          jumpToStep(2);
        })
        .catch((error) => handleError(error));

      if (account?.meta?.isExternal) {
        setShowSigner(true);
      } else {
        // go to generate gift
        setProcessingMsg(`Removing the gift from ${giftTheme.network}...`);
        setProcessing(true);
      }
    }
  };

  const setAccountHandler = (account) => {
    if (account) {
      setAccount(account);
      nextStep();
    } else {
      handleError(
        new Error('No account was selected, please login with your account!')
      );
    }
  };

  const accountOption = {
    EXTENSION: ConnectExtension,
    HARDWALLET: LedgerMain,
    SIGNER: ConnectSigner
  };

  if (step < 2 && account) {
    setAccount(null);
  }
  const steps = [];
  // Step-0
  steps.push(<Landing />);

  // Step-1
  steps.push(<ConnectAccount />);

  // Step-2
  const AccountOptionElement = accountOption[accountSource]
    ? (
        createElement(accountOption[accountSource], {
          setAccountHandler,
          prevStepHandler: prevStep
        })
      )
    : (
    <div>No account type is selected</div>
      );
  steps.push(AccountOptionElement);

  // Step-3
  steps.push(
    <GenerateGift
      account={account}
      initialGiftInfo={giftInfo}
      setGiftInfoHandler={setGiftHandler}
      giftFeeMultiplier={getGiftFeeMultiplier ? getGiftFeeMultiplier() : 1}
    />
  );

  // Step-4
  steps.push(
    <ConfirmGift
      account={account}
      giftInfo={giftInfo}
      generateGiftHandler={generateGiftHandler}
      giftFeeMultiplier={getGiftFeeMultiplier ? getGiftFeeMultiplier() : 1}
    />
  );

  // Step-5
  steps.push(
    <PresentGift giftInfo={giftInfo} removeGiftHandler={removeGiftHandler} />
  );

  const currentStepComponent = steps[step];

  let currentComponent;
  if (showSigner) {
    currentComponent = (
      <ParityQRSigner
        address={qrAddress}
        genesisHash={api.genesisHash}
        isHashed={isQrHashed}
        onSignature={_addQrSignature}
        payload={qrPayload}
        prevStepHandler={prevStep}
      />
    );
  } else {
    currentComponent = currentStepComponent;
  }
  return (
    <GenerateContext.Provider
      value={{
        nextStep,
        prevStep,
        jumpToStep,
        setAccountSource
      }}>
      <Header selectedAccount={account?.address} />
      <Container className="justify-content-center align-items-center">
        <Row className="my-2 my-md-5 justify-content-center align-items-center">
          <Col className="my-md-3 d-flex justify-content-center align-items-center">
            {step === 0 && (
              <div className="landingpage">{currentComponent}</div>
            )}
            {step > 0 && (
              <Card
                style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
                className="shadow">
                {currentComponent}
              </Card>
            )}
          </Col>
        </Row>
        <ErrorModal
          show={!!processingError}
          message={processingError}
          handleClose={() => resetPresentation()}
        />
        <Processing
          show={!processingError && processing}
          message={processingMsg}
        />
      </Container>
      <Footer />
    </GenerateContext.Provider>
  );
}
