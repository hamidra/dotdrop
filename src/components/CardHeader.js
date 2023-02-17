import { Row, Col } from 'react-bootstrap';
import { ArrowLeft } from 'phosphor-react';

export default function CardHeader ({ cardText, title, backClickHandler }) {
  const arrowSize = 24;
  const arrowPositionLeft = 10;
  const colPaddingX = arrowSize + arrowPositionLeft + 3;
  return (
    <>
      <Row
        className="align-items-center text-center position-relative pt-2 no-gutters"
        style={{ marginBottom: '2rem' }}
      >
        <Col>
          {backClickHandler && (
            <ArrowLeft
              className="back-arrow"
              size={arrowSize}
              onClick={() => backClickHandler()}
            />
          )}
          <h2
            style={{
              wordWrap: 'normal',
              ...(backClickHandler
                ? { paddingLeft: colPaddingX, paddingRight: colPaddingX }
                : {})
            }}
            className="card-header-title"
          >
            {title}
          </h2>
          <p className="text-center text-card">{cardText}</p>
        </Col>
      </Row>
    </>
  );
}
