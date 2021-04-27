import { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { GenerateContext } from './GenerateMain';

export default function SelectAccount({ children }) {
  const { jumpToStep } = useContext(GenerateContext);
  return (
    <>
      <Card style={{ width: 800, maxWidth: '100%' }} className="shadow">
        <Card.Body>{children}</Card.Body>
      </Card>
    </>
  );
}
