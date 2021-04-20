import { Card } from 'react-bootstrap';
export default function OptionCard({ image, children, onClick }) {
  return (
    <Card
      style={{ width: '200px', height: '200px' }}
      className="my-2 shadow"
      onClick={onClick}>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
        {children}
      </Card.Body>
    </Card>
  );
}
