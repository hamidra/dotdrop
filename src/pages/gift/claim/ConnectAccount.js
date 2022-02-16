import { Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import Divider from '../../../components/Divider';
import { useSubstrate } from '../../../substrate-lib';

export default function ConnectAccount ({ setAccountSourceHandler }) {
  const { apiState, giftTheme } = useSubstrate();
  return (
    <Card.Body className="d-flex flex-column">
      <CardHeader
        title={giftTheme?.content === 'NFT' ? 'Claim Your NFT' : `Claim Your ${giftTheme?.content} Gift`}
        cardText={[
          `Create a new ${giftTheme?.network} address to store your funds`,
          <br />,
          'or use an existing account.'
        ]}
      />
      <Col className="d-flex flex-column  flex-grow-1 justify-content-center align-items-center">
        <Row className="d-flex flex-column justify-content-center align-items-center pt-2">
          <button
            className="btn btn-primary btn-lg"
            disabled={apiState !== 'READY'}
            onClick={() => {
              setAccountSourceHandler('NEW');
            }}>
            {`Create ${giftTheme?.network} Address`}
          </button>
        </Row>
        <div className="my-4 text-white">Or</div>
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <button
            className="btn btn-link"
            disabled={apiState !== 'READY'}
            onClick={() => {
              setAccountSourceHandler('EXISTING');
            }}>
            Connect Existing Account
          </button>
        </Row>
      </Col>
    </Card.Body>
  );
}
