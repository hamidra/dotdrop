import { Row, Col } from 'react-bootstrap';
export default function CardHeader({ title, backClickHandler }) {
  return (
    <>
      <Row className="align-iterms-center text-center">
        {backClickHandler && (
          <Col xs="1">
            <div onClick={() => backClickHandler()}>{'<-'}</div>
          </Col>
        )}
        <Col>
          <h3>{title}</h3>
        </Col>
      </Row>
    </>
  );
}
