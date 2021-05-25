import { Button } from 'react-bootstrap';
export default function LinkButton ({ children, className, onClick }) {
  return (
    <Button
      style={{ background: 'none', border: 'none', color: '#E6007A' }}
      className={`${className} link-button py-2 px-3 rounded-0`}
      onClick={onClick}>
      {children}
    </Button>
  );
}
