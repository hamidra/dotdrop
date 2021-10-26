import { Row, Col, Card, Image } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import config from '../../../config';
import confetti from '../../../images/confetti.png';
export default function Claimed ({ accountAddress, nft }) {
  console.log(config.NFT_PREVIEW_URL);
  const previewUrl = new URL(`collectibles/statemine/${nft.classId}/${nft.instanceId}`, config.NFT_PREVIEW_URL);
  const cardText = 'Congratulations! You have successfully claimed your NFT.';
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'You broke the wall!'}
          cardText={cardText}
        />
          <Col className="pt-4 d-flex justify-content-center align-items-center">
            {(nft?.art) ? (<Image style={{ height: 300 }} className="nft" src={nft?.art} />) : (<Image src={confetti} />)}
          </Col>
        <div className="flex-grow-1" />
        <Col className="pt-5 d-flex justify-content-center align-items-center">
          <a
            className="btn btn-primary"
            href={previewUrl}
            target="_blank"
            rel="noreferrer">
            See your NFT on Singular
          </a>
        </Col>
      </Card.Body>
    </>
  );
}
