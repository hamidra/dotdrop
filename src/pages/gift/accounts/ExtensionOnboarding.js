import { useEffect, useState } from 'react';
import { Row, Col, Card, Container, Media } from 'react-bootstrap';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useSubstrate, utils } from '../../../substrate-lib';
import CardHeader from '../../../components/CardHeader';
import { stringHelpers } from '../../../utils';
import { useParams } from 'react-router-dom';
import { ArrowBendDownRight } from 'phosphor-react';
import extensionLogo from '../../../images/extension_logo_128.png';
import analytics from '../../../analytics';

const ExtensionOnboarding = () => {
  const { api, apiState, chainInfo } = useSubstrate();
  const [balance, setBalance] = useState(null);

  const { accountAddress } = useParams();
  useEffect(() => {
    let unsub;
    setBalance(null);
    accountAddress &&
      utils.validateAddress(accountAddress, chainInfo?.ss58Format) &&
      api?.query?.system &&
      api.query.system
        .account(accountAddress, ({ nonce, data: balance }) => {
          setBalance(balance);
          console.log(
            `free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`
          );
        })
        .then((result) => {
          unsub = result;
        })
        .catch((error) => {
          console.log(error);
        });

    return () => unsub && unsub();
  }, [api, apiState, accountAddress, chainInfo]);

  return (
    <>
      <Header />
      <Container>
        <Row className="p-3 py-sm-5">
          <Col className="d-flex justify-content-center">
            <Card
              style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
              className="d-flex shadow mb-5 m-sm-0">
              <Card.Body className="d-flex flex-column">
                <CardHeader
                  title={'Import Your Address'}
                  cardText="To get started using your Polkadot address, import it to the Polkadot.js Extension."
                />
                <Row className="justify-content-center py-4">
                  <div className="d-flex flex-column align-items-end mb-2 mr-2">
                    <strong className="bg-gray p-2 mr-2 rounded">
                      {`${
                        accountAddress &&
                        utils.validateAddress(
                          accountAddress,
                          chainInfo?.ss58Format
                        )
                          ? stringHelpers.truncateMiddle(accountAddress, 5)
                          : 'Not a valid Account'
                      }`}
                    </strong>
                    <ArrowBendDownRight id="arrowbenddownright" size={48} />
                  </div>
                  <Media className="pt-5">
                    <img
                      width={64}
                      height={64}
                      className="mr-3 rounded"
                      src={extensionLogo}
                      alt={'Polkadot Extension'}
                    />
                  </Media>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center text-secondary">
                    Address balance:&nbsp;
                    {balance?.free &&
                      utils.fromChainUnit(
                        balance.free,
                        chainInfo?.decimals,
                        2
                      ) + ` ${chainInfo.token}`}
                  </Col>
                </Row>
                <div className="d-flex flex-grow-1" />
                <Row>
                  <Col className="pt-4 d-flex justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        analytics.track('extension_install_clicked');
                        e.preventDefault();
                        window.open(
                          'https://polkadot.js.org/extension/',
                          '_blank'
                        );
                      }}
                      type="button">
                      Install Polkadot.js Extension
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ExtensionOnboarding;
