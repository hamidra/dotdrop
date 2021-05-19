import { Row, Col } from 'react-bootstrap';
import { ArrowLeft } from 'phosphor-react';

export default function CardHeader ({ title, backClickHandler }) {
  return (
    <>
      <Row className="align-items-center text-center position-relative py-2">
        <Col style={{ marginLeft: 25, marginRight: 25 }}>
          {backClickHandler && (
            <ArrowLeft
              size={24}
              onClick={() => backClickHandler()}
              style={{
                position: 'absolute',
                left: 10,
                top: '0.75rem',
                color: '#6C757D',
                cursor: 'pointer'
              }}
            />
          /*             <Image
              src={backArrow}
              style={{
                width: 20,
                position: 'absolute',
                left: 10,
                top: '1rem',
                zIndex: 5,
                cursor: 'pointer'
              }}
              onClick={() => backClickHandler()}
            /> */
          )}
          <h2>{title}</h2>
        </Col>
      </Row>
    </>
  );
}
