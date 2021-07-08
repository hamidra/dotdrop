import { Row, Col, Card, Image } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import confetti from '../../../images/confetti.png';
import nft from '../../../images/ksm-nft1.jpg';
import { useHistory } from 'react-router-dom';
import { useSubstrate, utils } from '../../../substrate-lib';

export default function Claimed ({ amount, accountAddress }) {
  const history = useHistory();
  const { giftTheme, chainInfo } = useSubstrate();
  const amountStr = utils.formatBalance(amount, chainInfo?.token);
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={giftTheme?.content === 'NFT' ? 'You broke the wall!' : 'Congratulations!'}
          cardText={giftTheme?.content === 'NFT' ? 'Congratulations! You have successfully claimed a limited edition NFT by Andreas Preis.' : 'Congratulations!'}
        />
        {
          giftTheme?.content === 'NFT'
            ? <Col className="pt-4 d-flex justify-content-center align-items-center">
              <Image className="w-100 nft" src={nft} />
            </Col>
            : <Row className="justify-content-center flex-column align-items-center">
            <Col className="pt-4 d-flex justify-content-center align-items-center">
              <Image style={{ width: 120 }} src={confetti} />
            </Col>
            <Col className="pt-5">
              <p className="text-center">
                {`Your ${giftTheme?.network} account has been funded and your gift of ${amountStr} has been successfully transferred.`}
              </p>
            </Col>
          </Row>
        }
        <div className="flex-grow-1" />
        <Col className="pt-5 d-flex justify-content-center align-items-center">
          {
            giftTheme?.content === 'NFT'
              ? <a
                className="btn btn-primary"
                href="https://singular.rmrk.app/"
                target="_blank"
                rel="noreferrer"
                >
                See NFT on Singular
              </a>
              : <button
              className="btn btn-primary"
              onClick={() => history.push(`/account/${accountAddress}`)}>
              See Account
            </button>
          }
        </Col>
      </Card.Body>
    </>
  );
}
