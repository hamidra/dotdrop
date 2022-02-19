import { Row, Col, Card, Image } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import config from '../../../config';

import giftPolkadot from '../../../images/Gift_Polkadot.svg';
import giftKusama from '../../../images/Gift_Kusama.svg';
import { useSubstrate, utils } from '../../../substrate-lib';

export default function Claimed ({ accountAddress, nft }) {
  const { giftTheme } = useSubstrate();
  const previewUrl = new URL(
    `collectibles/statemine/${nft?.classId}/${nft?.instanceId}`,
    config.NFT_PREVIEW_URL
  );
  const cardText = 'Congratulations! You have successfully claimed your NFT.';
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader title={'You broke the wall!'} cardText={cardText} />
        <Col className="pt-4 d-flex justify-content-center align-items-center">
          {nft?.image
            ? (
            <Image
              style={{ height: 300 }}
              className="nft"
              loading="lazy"
              src={nft.image}
            />
              )
            : (
            <Image
              style={{ width: 256 }}
              src={giftTheme.network === 'Polkadot' ? giftPolkadot : giftKusama}
            />
              )}
        </Col>
        <div className="flex-grow-1" />
        <Col className="pt-5 d-flex justify-content-center align-items-center">
          <a
            className="btn btn-primary"
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
          >
            See your NFT on Singular
          </a>
        </Col>
      </Card.Body>
    </>
  );
}
