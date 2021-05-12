import { Button } from 'react-bootstrap';
import { MdChevronRight } from 'react-icons/md';

const CardButton = ({ children, onClick }) => {
  return (
        <Button
            className='card-button'
            onClick={onClick}
        >
            <div style={{ background: '#EEE', width: '48px', height: '48px', flexShrink: '0', borderRadius: '8px', marginRight: '8px' }}></div>
            {children}
            <div className='flex-grow-1'></div>
            <MdChevronRight style={{ fontSize: '1.5rem', color: '#6C757D' }} />
        </Button>
  );
};

export default CardButton;
