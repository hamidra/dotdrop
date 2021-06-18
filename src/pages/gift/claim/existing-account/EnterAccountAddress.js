import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import { useSubstrate, utils } from '../../../../substrate-lib';

export default function EnterAccountAddress({
  setAddressHandler,
  prevStepHandler,
}) {
  const { chainInfo, giftTheme } = useSubstrate();

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
          cardText={`Enter your existing ${giftTheme?.network} account address below`}
          backClickHandler={prevStepHandler}
        />
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
                  <Form.Text className="text-danger">{addressError}</Form.Text>
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <div className="flex-grow-1" />
        <Row>
          <Col className="d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => _setAddressHandler()}>
              Claim Gift
            </button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
