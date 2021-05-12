import { Button, Image } from 'react-bootstrap';
import { MdChevronRight } from 'react-icons/md';

import signerLogo from '../images/signer_logo_128.png';
import extensionLogo from '../images/extension_logo_128.png';
import ledgerLogo from '../images/ledger_logo_128.png';

const CardButton = ({ children, logo, onClick }) => {
  let image = '';

  if (logo === 'signer') {
    image = signerLogo;
  } else if (logo === 'extension') {
    image = extensionLogo;
  } else if (logo === 'ledger') {
    image = ledgerLogo;
  }

  return (
        <Button
            className='card-button'
            onClick={onClick}
        >
            <Image
              src={image}
              style={{
                width: '48px',
                height: '48px',
                flexShrink: '0',
                borderRadius: '8px',
                marginRight: '8px'
              }}
            >
            </Image>
            {children}
            <div className='flex-grow-1'></div>
            <MdChevronRight style={{ fontSize: '1.5rem', color: '#6C757D' }} />
        </Button>
  );
};

export default CardButton;
