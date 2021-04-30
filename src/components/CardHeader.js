import { Row, Col, Image } from 'react-bootstrap';
import backArrow from '../images/back-arrow.png';
export default function CardHeader({ title, backClickHandler }) {
  return (
    <>
      <Row className="align-items-center text-center position-relative">
        {backClickHandler && (
          <Image
            src={backArrow}
            style={{
              width: 20,
              position: 'absolute',
              left: 10,
              top: 5,
              zIndex: 1010,
            }}
            onClick={() => backClickHandler()}
          />
        )}
        <Col style={{ marginLeft: 25, marginRight: 25 }}>
          <h2>{title}</h2>
        </Col>
      </Row>
    </>
  );
}
