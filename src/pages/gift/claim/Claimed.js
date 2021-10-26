import { useState, useEffect } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';
import CardHeader from '../../../components/CardHeader';
import config from '../../../config';
import { useSubstrate } from '../../../substrate-lib';

const getIpfsUrl = (cid) => {
  return cid && (`https://rmrk.mypinata.cloud/ipfs/${cid}`);
};
export default function Claimed ({ accountAddress, nft }) {
  console.log(config.NFT_PREVIEW_URL);
  const previewUrl = new URL(`collectibles/statemine/${nft.classId}/${nft.instanceId}`, config.NFT_PREVIEW_URL);
  const cardText = 'Congratulations! You have successfully claimed your NFT.';
  const [nftImage, setNftImage] = useState(null);
  const { api, apiState } = useSubstrate();
  useEffect(() => {
    const fetchIpfsImage = async () => {
      const { classId, instanceId } = nft || {};
      console.log(nft);
      if (classId) {
        if (instanceId) {
          const metaCid = await api.query.uniques?.instanceMetadataOf(classId, instanceId);
          const metaUrl = getIpfsUrl(metaCid);
          const metadata = axios.get(metaUrl);
          const imageCid = metadata?.image;
          setNftImage(getIpfsUrl(imageCid));
        } else {
          const metaCid = await api.query.uniques.classMetadataOf(classId);
          const metaUrl = getIpfsUrl(metaCid);
          const metadata = axios.get(metaUrl);
          const imageCid = metadata?.image;
          setNftImage(getIpfsUrl(imageCid));
        }
      }
    };
    api && apiState === 'READY' && fetchIpfsImage();
  }, [nft, api, apiState, getIpfsUrl]);
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'You broke the wall!'}
          cardText={cardText}
        />
        <div className="blurred pt-4 d-flex justify-content-center align-items-center">
          {(nftImage) && (<Image style={{ height: 300 }} className="nft" src={nftImage} />)}
        </div>
        <div className="overlay-center pt-5 d-flex justify-content-center align-items-center">
          <a
            className="btn btn-primary"
            href={previewUrl}
            target="_blank"
            rel="noreferrer">
            See NFT on Singular
          </a>
        </div>
      </Card.Body>
    </>
  );
}
