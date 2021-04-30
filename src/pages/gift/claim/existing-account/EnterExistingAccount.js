import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '../../../../components/CustomButton';
import CardHeader from '../../../../components/CardHeader';
export default function LoadExistingAccount({
  setAddressHandler,
  prevStepHandler,
}) {
  const [address, setAddress] = useState('');
  const _setAddressHandler = () => {
    address && setAddressHandler(address);
  };
  return (
    <>
      <Card.Body>
        <CardHeader
          title={'Account Address'}
          backClickHandler={() => prevStepHandler()}
        />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              Enter your the existing Polkadot account address below
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col>
            <Form autoComplete="off" className="w-100">
              <Form.Group controlId="formAccountAddressGroup">
                <Form.Label>Account Address</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="12YS..."
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button onClick={() => _setAddressHandler()}>Claim Gift</Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
