import { Container } from 'react-bootstrap';

import PolkadotLogo from '../../images/polkadot_logo_footer.png';

export default function Footer({ selectedAccount }) {
  return (
    <footer
      className="footer"
      variant="light"
      expand="md"
      style={{ backgroundColor: '#F9FAFB' }}>
      <Container className="d-flex flex-column flex-sm-row">
        <div style={{ margin: '8px' }}>
          <a
            href="https://polkadot.network"
            target="_blank"
            rel="noopener noreferrer">
            <img
              width={154}
              className="mr-5"
              src={PolkadotLogo}
              alt={'Polkadot'}
            />
          </a>
        </div>
        <div style={{ fontSize: '12px', margin: '8px' }}>
          <strong>Polkadot Gifts</strong> lets you send DOT gifts <br />
          to friends and family members.
        </div>
        <div className="footer-grow flex-grow-1" />
        <div style={{ color: '#6C757D', fontSize: '12px', margin: '8px' }}>
          <div>© {new Date().getFullYear()} All rights reserved.</div>
          <div className="d-flex flex-row">
            <div>Terms &amp; Conditions</div>
            &nbsp;·&nbsp;
            <div>Privacy Policy</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
