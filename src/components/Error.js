import { Modal } from 'react-bootstrap';
export default function Error ({ show, message, handleClose }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Something went wrong</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ height: '100px' }}
            className="d-flex flex-column justify-content-around align-items-center">
            <div>{message}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
