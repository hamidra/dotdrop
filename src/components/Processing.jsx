import { Spinner } from 'react-bootstrap';
export default function Processing({ show, message }) {
  return (
    <>
      <div
        className={
          show
            ? 'processing-wrapper'
            : 'processing-wrapper processing-wrapper--hidden'
        }
      >
        <div className="processing">
          <Spinner animation="border" role="status">
            <span className="sr-only">Processing...</span>
          </Spinner>
          <div>{message}</div>
        </div>
      </div>
    </>
  );
}
