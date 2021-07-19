import { useState } from 'react';

import Instructions from './LedgerInstructions';
import ConnectExtension from '../ConnectExtension';

export default function LedgerMain ({
  setAccountHandler,
  setAddressHandler,
  prevStepHandler
}) {
  const [processing, setProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [processingMsg, setProcessingMsg] = useState('');

  const [step, setStep] = useState(0);

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

  const steps = [];
  // add Step-0
  steps.push(
    <Instructions
      prevStepHandler={prevStepHandler}
      nextStepHandler={nextStep}
    />
  );

  // add Step-1
  steps.push(
    <ConnectExtension
      prevStepHandler={prevStep}
      setAddressHandler={setAddressHandler}
      setAccountHandler={setAccountHandler}
    />
  );

  return <>{steps[step]}</>;
}
