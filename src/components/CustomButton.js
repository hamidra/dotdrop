import { Button } from 'react-bootstrap';
export default function CustomButton({ children, onClick }) {
  return (
    <Button
      style={{ minWidth: '100px', fontWeight: 'bold' }}
      variant="outline-primary"
      className="shadow-sm py-2 px-3"
      onClick={onClick}>
      {children}
    </Button>
  );
}
