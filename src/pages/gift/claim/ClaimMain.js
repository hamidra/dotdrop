import { createContext, useState } from 'react';
import Claimed from './Claimed';
import CreateAccountOptions from './CreateAccountOptions';
import VerifySecret from './VerifySecret';
import CreateNewAccount from './CreateNewAccount';

const ClaimContext = createContext();

export { ClaimContext };
export default function ClaimMain() {
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(null);
  const [accountSource, setAccountSource] = useState(null);
  const [redeemSecret, setRedeemSecret] = useState('');
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const accountOption = {
    NEW_ACCOUNT: <CreateNewAccount />,
  };
  let currentComponent = <CreateAccountOptions />;
  switch (step) {
    case 1:
      currentComponent = accountOption[accountSource];
      break;
    case 2:
      currentComponent = <VerifySecret redeemSecret={redeemSecret} />;
      break;
    case 3:
      currentComponent = <Claimed />;
      break;
    default:
      currentComponent = <CreateAccountOptions />;
  }
  return (
    <ClaimContext.Provider
      value={{
        nextStep,
        prevStep,
        setAccount,
        setAccountSource,
        setRedeemSecret,
      }}>
      {currentComponent}
    </ClaimContext.Provider>
  );
}
