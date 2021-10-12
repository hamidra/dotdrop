import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
import { Card, Row, Col, Image } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate } from '../../../substrate-lib';
import giftPolkadot from '../../../images/Gift_Polkadot.png';
import giftKusama from '../../../images/Gift_Kusama.png';
export default function Landing () {
  const { nextStep } = useContext(GenerateContext);
  const { giftTheme } = useSubstrate();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Image style={{ width: 100 }} src={giftTheme.network === 'Polkadot' ? giftPolkadot : giftKusama} />
      </div>
      <Card.Body style={{ paddingTop: '1rem' }} className="d-flex flex-column">
        <CardHeader
          title={`${giftTheme?.network} Gifts`}
          cardText={`Share your love of ${giftTheme?.network} with friends and family and help onboard them to the network. ${giftTheme?.network} Gifts lets you send ${giftTheme?.content} to anyone, even if they don’t have a ${giftTheme?.network} account.`}
        />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-around align-items-center">
            <div className="pt-2">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => nextStep()}>
                Send a Gift
              </button>
            </div>
            <a
              className="pt-4 small text-underline"
              href="#/About"
              target="_blank">
              {`→ How does ${giftTheme?.network} Gifts work?`}
            </a>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
