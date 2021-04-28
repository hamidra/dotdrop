import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
export default function HardwalletAccount() {
  const { prevStep } = useContext(GenerateContext);
  return (
    <div className="text-center">
      <div onClick={() => prevStep()}>{'<-'}</div>
      <h4>Hardware Wallet Account</h4>
      <h2>Coming soon!</h2>
    </div>
  );
}
