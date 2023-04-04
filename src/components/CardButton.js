import { Image } from 'react-bootstrap';
import { CaretRight } from 'phosphor-react';

import signerLogo from '../images/signer_logo_128.png';
import extensionLogo from '../images/extension_logo_128.png';
import ledgerLogo from '../images/ledger_logo_128.png';

const CardButton = ({ children, logo, onClick, smallFont }) => {
  let image = '';

  if (logo === 'signer') {
    image = signerLogo;
  } else if (logo === 'extension') {
    image = extensionLogo;
  } else if (logo === 'ledger') {
    image = ledgerLogo;
  }

  return (
    <button
      className="btn-card"
      onClick={onClick}
      style={smallFont ? { fontSize: '14px' } : { fontSize: '16px' }}
    >
      <Image
        src={image}
        style={{
          width: '48px',
          height: '48px',
          flexShrink: '0',
          borderRadius: '8px',
          marginRight: '8px',
        }}
      ></Image>
      {children}
      <div className="flex-grow-1"></div>
      <CaretRight
        style={{ flexShrink: '0', color: '#6C757D' }}
        size={14}
        weight="bold"
      />
    </button>
  );
};

export default CardButton;
