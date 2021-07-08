import { Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import Divider from '../../../components/Divider';
import { useSubstrate } from '../../../substrate-lib';

export default function ConnectAccount({ setAccountSourceHandler }) {
  const { giftTheme } = useSubstrate();
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={
            giftTheme?.content === 'NFT' ? 'Claim Your NFT' : 'Claim Your Gift'
          }
          cardText={`To claim your ${giftTheme?.content}, create a new ${giftTheme?.network} account or connect an existing account.`}
        />
        <Col className="d-flex flex-column  flex-grow-1 justify-content-center align-items-center">
          <Row className="d-flex flex-column justify-content-center align-items-center pt-2">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setAccountSourceHandler('NEW')}>
              {`Create ${giftTheme?.network} Account`}
            </button>
          </Row>
          <Divider text="Or" />
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <button
              className="btn btn-link"
              onClick={() => setAccountSourceHandler('EXISTING')}>
              Connect Existing Account
            </button>
          </Row>
        </Col>
      </Card.Body>
    </>
  );
}
