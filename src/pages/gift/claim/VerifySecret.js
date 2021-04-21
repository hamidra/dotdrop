import { useContext, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { ClaimContext } from './ClaimMain';
export default function VerifySecret({ claimGiftHandler }) {
  const { prevStep } = useContext(ClaimContext);
  const [redeemSecret, setRedeemSecret] = useState('');
  return (
    <>
      <Row className="p-4">
        <Col>
          <Button onClick={() => prevStep()}>{'< Back'}</Button>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
          <Card style={{ width: 800, maxWidth: '100%' }} className="shadow">
            <Card.Body>
              <Row className="p-3 text-center">
                <Col>
                  <h3>
                    Enter the 12 words secret you have recieved to redeem your
                    gift!
                  </h3>
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center">
                <Col
                  style={{ height: 200 }}
                  className="d-flex flex-column justify-content-center align-items-center text-center">
                  <textarea
                    className="w-50 h-75"
                    onChange={(e) => setRedeemSecret(e.target.value)}
                    value={redeemSecret}
                  />
                </Col>
                <div className="w-100" />
                <Col className="d-flex justify-content-end">
                  <Button onClick={() => claimGiftHandler(redeemSecret)}>
                    Redeem
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
