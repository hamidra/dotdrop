import { useState, createElement } from 'react';
import ConnectExistingAccount from './ConnectExistingAccount';
import EnterAccountAddress from './EnterAccountAddress';
import ConnectExtension from '../../accounts/ConnectExtension';
import ConnectSigner from '../../accounts/ConnectSigner';

export default function ExistingAccountMain ({
  setAddressHandler,
  prevStepHandler
}) {
  const [step, setStep] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [processingMsg, setProcessingMsg] = useState('');
  const [existingAccountSource, setExistingAccountSource] = useState('EXTENSION');

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

  const setExistingAccountSourceHandler = (accountSource) => {
    setExistingAccountSource(accountSource);
    nextStep();
  };

  const accountOption = {
    ENTER: EnterAccountAddress,
    EXTENSION: ConnectExtension,
    SIGNER: ConnectSigner
  };

  const steps = [];

  // add Step-0
  const AccountOptionElement = accountOption[existingAccountSource]
    ? (
        createElement(accountOption[existingAccountSource], {
          setAddressHandler: setAddressHandler,
          prevStepHandler: prevStepHandler
        })
      )
    : (
    <div>No account type is selected</div>
      );
  steps.push(AccountOptionElement);

  return <>{steps[step]}</>;
}
