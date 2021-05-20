import { useContext, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { ClaimContext } from './ClaimMain';
import CardHeader from '../../../components/CardHeader';
export default function VerifySecret({ claimGiftHandler }) {
  const { prevStep } = useContext(ClaimContext);
  const [redeemSecret, setRedeemSecret] = useState('');
  const redeemHandler = () => {
    // ToDO: add better input validation to verify redeemSecret is not empty,
    // and is indeed a valid mnemonic phrase
    if (redeemSecret) {
      claimGiftHandler(redeemSecret);
    }
  };
  return (
    <>
      <Card.Body className='d-flex flex-column'>
        <CardHeader
          title={'Claim Your Gift'}
          cardText='Every Polkadot account needs a minimum balance to be active on
          the network. Enter the secret hash you have received to claim your gift and fund your account.'
          backClickHandler={prevStep}
        />
        <Row className="pt-4 justify-content-center align-items-center">
          <Col>
            <Form autoComplete="off" className="w-100">
              <Form.Group controlId="formGroupWord1">
                <Form.Label>Secret Gift Hash</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="0x4rt6..."
                  onChange={(e) => setRedeemSecret(e.target.value)}
                  value={redeemSecret}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <div className='d-flex flex-grow-1' />
        <Row className=" pt-5 justify-content-center align-items-center">
          <Col className="d-flex justify-content-center">
            <Button onClick={() => redeemHandler()}>Claim Gift</Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
