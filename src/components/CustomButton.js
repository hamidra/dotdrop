import { Button } from 'react-bootstrap';
export default function CustomButton({
  children,
  className,
  onClick,
  ...props
}) {
  return (
    <Button
      style={{ minWidth: '100px', fontWeight: 'bold' }}
      variant="outline-primary"
      className={`${className} shadow-sm py-2 px-3`}
      onClick={onClick}
      {...props}>
      {children}
    </Button>
  );
}
