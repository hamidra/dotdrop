import { Button } from 'react-bootstrap';
export default function CustomButton({ children, onClick }) {
  return (
    <Button
      style={{ minWidth: '100px' }}
      variant="outline-primary"
      className="shadow-sm"
      onClick={onClick}>
      {children}
    </Button>
  );
}
