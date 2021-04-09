import { createContext, useState } from 'react';
import Claimed from './Claimed';
import CreateAccountOptions from './CreateAccountOptions';
import VerifySecret from './VerifySecret';
import CreateNewAccount from './CreateNewAccount';
const ClaimContext = createContext();

export { ClaimContext };
export default function ClaimMain() {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  let currentComponent = <CreateAccountOptions />;
  switch (step) {
    case 1:
      currentComponent = <CreateNewAccount />;
      break;
    case 2:
      currentComponent = <VerifySecret />;
      break;
    case 3:
      currentComponent = <Claimed />;
      break;
    default:
      currentComponent = <CreateAccountOptions />;
  }
  return (
    <ClaimContext.Provider value={{ nextStep, prevStep }}>
      {currentComponent}
    </ClaimContext.Provider>
  );
}
