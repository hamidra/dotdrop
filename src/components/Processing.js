import { Modal, Spinner, Row, Col } from 'react-bootstrap';
export default function Processing({ show, message }) {
  return (
    <>
      <Modal show={show} centered>
        <Modal.Body>
          <div
            style={{ height: '100px' }}
            className="d-flex flex-column justify-content-around align-items-center">
            <div>{message}</div>
            <div>
              <Spinner animation="border" role="status">
                <span className="sr-only">Processing...</span>
              </Spinner>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
