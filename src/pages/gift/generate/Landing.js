import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
export default function Landing() {
  const { nextStep } = useContext(GenerateContext);
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2>Gift Some Dots</h2>
        <p>
          Send DOTs to your friends and familiy, and have them join the Polkadot
          Network today
        </p>
        <Button variant="outline-primary" onClick={() => nextStep()}>
          Send a New Gift
        </Button>
      </div>
    </>
  );
}
