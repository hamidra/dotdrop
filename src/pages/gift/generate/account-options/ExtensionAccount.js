import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { GenerateContext } from '../GenerateMain';

export default function ExtensionAccount() {
  const { nextStep } = useContext(GenerateContext);
  return (
    <div>
      <Button onClick={() => nextStep()}>Next</Button>
    </div>
  );
}
