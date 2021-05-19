import { Button } from 'react-bootstrap';
export default function LinkButton ({ children, onClick }) {
  return (
    <Button
      style={{ background: 'none', border: 'none', color: '#E6007A' }}
      className="link-button py-2 px-3"
      onClick={onClick}>
      {children}
    </Button>
  );
}
