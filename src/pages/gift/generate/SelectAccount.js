import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { GenerateContext } from './GenerateMain';

export default function SelectAccount({ title, children }) {
  const { prevStep } = useContext(GenerateContext);
  return (
    <>
      <Card.Body>
        <CardHeader title={title} backClickHandler={() => prevStep()} />
        {children}
      </Card.Body>
    </>
  );
}
