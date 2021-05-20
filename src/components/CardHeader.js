import { Row, Col } from 'react-bootstrap';
import { ArrowLeft } from 'phosphor-react';

export default function CardHeader ({ cardText, title, backClickHandler }) {
  return (
    <>
      <Row
        className="align-items-center text-center position-relative pt-2 no-gutters"
        style={{ marginBottom: '2rem' }}
      >
        <Col>
          {backClickHandler && (
            <ArrowLeft
              size={24}
              onClick={() => backClickHandler()}
              style={{
                position: 'absolute',
                left: 10,
                top: '0.75rem',
                color: '#9CA3AF',
                cursor: 'pointer'
              }}
            />
          )}
          <h2>{title}</h2>
          <p className='text-center text-card'>{cardText}</p>
        </Col>
      </Row>
    </>
  );
}
