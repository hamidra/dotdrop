import { Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import Divider from '../../../../components/Divider';

export default function ConnectAccount ({
  handleDownloadOption,
  prevStepHandler
}) {
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title="Add JSON Backup"
          cardText="You can create a password-protected JSON backup as an alternate  way to restore your account."
          backClickHandler={() => prevStepHandler()}
        />
        <Col className="d-flex flex-column  flex-grow-1 justify-content-center align-items-center">
          <Row className="d-flex flex-column justify-content-center align-items-center pt-2">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => handleDownloadOption(true)}>
              Create JSON backup
            </button>
          </Row>
          <Divider text="Or" />
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <button
              className="btn btn-link"
              onClick={() => handleDownloadOption(false)}>
              Skip backup and claim gift
            </button>
          </Row>
        </Col>
      </Card.Body>
    </>
  );
}
