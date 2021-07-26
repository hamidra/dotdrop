import { Link } from 'react-router-dom';

export default function Footer ({ variant, selectedAccount }) {
  return (
    <footer
      className={`${variant} footer d-flex flex-column flex-md-row px-4`}
      expand="md">
      <div className="d-flex flex-column flex-sm-row">
        <div>
          © {new Date().getFullYear()} All rights reserved.
          <span className="d-none d-sm-inline">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
        <div>
          <span>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </span>
        </div>
      </div>
      <div className="footer-grow flex-grow-1" />
      <div>
        <strong>Questions?</strong>&nbsp;
        <a href="mailto:support@kusama.network?subject=NFTs">
          support@kusama.network
        </a>
      </div>
    </footer>
  );
}
