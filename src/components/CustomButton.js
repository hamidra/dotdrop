import { Button } from 'react-bootstrap';
export default function CustomButton ({ children, className, onClick }) {
  return (
    <Button
      style={{ minWidth: '100px', fontWeight: 'bold' }}
      variant="outline-primary"
      className={`${className} shadow-sm py-2 px-3`}
      onClick={onClick}>
      {children}
    </Button>
  );
}
