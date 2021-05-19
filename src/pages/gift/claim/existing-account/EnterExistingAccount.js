import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '../../../../components/CustomButton';
import CardHeader from '../../../../components/CardHeader';
import { useSubstrate, utils } from '../../../../substrate-lib';

export default function LoadExistingAccount({
  setAddressHandler,
  prevStepHandler,
}) {
  const { chainInfo } = useSubstrate();

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const validate = () => {
    let isValid = true;
    if (!address || !utils.validateAddress(address, chainInfo?.ss58Format)) {
      isValid = false;
      setAddressError('Please enter a valid address');
    }
    return isValid;
  };

  const _setAddressHandler = () => {
    validate(address) && setAddressHandler(address);
  };
  return (
    <>
      <Card.Body>
        <CardHeader
          title={'Account Address'}
          backClickHandler={prevStepHandler}
        />
        <div>
          <Row className="justify-content-center align-items-center">
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <p className="text-center">
                Enter your existing Polkadot account address below
              </p>
            </Col>
          </Row>
          <Row
            style={{ height: 200 }}
            className="justify-content-center align-items-center">
            <Col>
              <Form autoComplete="off" className="w-100">
                <Form.Group controlId="formAccountAddressGroup">
                  <Form.Label>Account Address</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="12YS..."
                    isInvalid={!!addressError}
                    onChange={(e) => {
                      setAddressError('');
                      setAddress(e.target.value);
                    }}
                    value={address}
                  />
                  {addressError && (
                    <Form.Text className="text-danger">
                      {addressError}
                    </Form.Text>
                  )}
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="pt-5">
            <Col className="d-flex justify-content-center">
              <Button onClick={() => _setAddressHandler()}>Claim Gift</Button>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </>
  );
}
