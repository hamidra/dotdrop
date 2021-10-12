import { Card, Row, Col, Image } from 'react-bootstrap';
import analytics from '../../../analytics';
import CardHeader from '../../../components/CardHeader';
import Divider from '../../../components/Divider';
import { useSubstrate } from '../../../substrate-lib';
import giftPolkadot from '../../../images/Gift_Polkadot.png';
import giftKusama from '../../../images/Gift_Kusama.png';

export default function ConnectAccount ({ setAccountSourceHandler }) {
  const { giftTheme } = useSubstrate();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Image style={{ width: 100 }} src={giftTheme.network === 'Polkadot' ? giftPolkadot : giftKusama} />
      </div>
      <Card.Body style={{ paddingTop: '1rem' }} className="d-flex flex-column">
        <CardHeader
          title={`Claim Your ${giftTheme?.content} Gift`}
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
              onClick={() => {
                analytics.track('claim_new_account');
                setAccountSourceHandler('NEW');
              }}>
              {`Create ${giftTheme?.network} Address`}
            </button>
          </Row>
          <div className="my-4 text-white">Or</div>
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <button
              className="btn btn-link"
              onClick={() => {
                analytics.track('claim_existing_account');
                setAccountSourceHandler('EXISTING');
              }}>
              Connect Existing Account
            </button>
          </Row>
        </Col>
      </Card.Body>
    </>
  );
}
