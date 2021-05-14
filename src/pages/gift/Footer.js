import { Row } from 'react-bootstrap';

import PolkadotLogo from '../../images/polkadot_logo_footer.png';

export default function Footer ({ selectedAccount }) {
  return (
    <footer
      className='d-flex flex-row px-5 py-4'
      variant="light"
      expand="md"
      style={{ backgroundColor: '#F9FAFB' }}
    >
      <a href='https://polkadot.network' target='_blank' rel='noopener noreferrer'>
        <img width={154} className="mr-5" src={PolkadotLogo} alt={'Polkadot'} />
      </a>
      <div
        className='mt-1'
        style={{ fontSize: '12px' }}
      >
        <strong>Polkadot Gifts</strong> lets you send DOT gifts <br/>to
        friends and family members.
      </div>
      <div className='flex-grow-1'/>
      <div
        className='mt-1'
        style={{ color: '#6C757D', fontSize: '12px' }}
      >
        <div>
          © {new Date().getFullYear()} All rights reserved.
        </div>
        <div
          className='d-flex flex-row'
        >
          <div>
            Terms &amp; Conditions
            </div>
            &nbsp;·&nbsp;
            <div>
              Privacy Policy
            </div>
          </div>
      </div>
    </footer>
  );
}
