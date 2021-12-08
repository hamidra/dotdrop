import { useContext } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../components/CardHeader';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Landing () {
  return (
    <>
      <Header />
      <Container className="justify-content-center align-items-center">
        <Row className="my-2 my-md-5 justify-content-center align-items-center">
          <Col className="my-md-3 d-flex justify-content-center align-items-center">
            <div className="landingpage">
              <Card.Body className="d-flex flex-column">
                <CardHeader
                  title={'Polkadot NFTs'}
                  cardText={['We are excited to announce that Polkadot NFTs are going to be available soon with the launch of Uniques pallet on Statemint parachain! Please come back with your NFT gift secret after the next Statemint parachain release to claim your NFT!']}
                />
              </Card.Body>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
