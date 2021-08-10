import { Link } from 'react-router-dom';

export default function Footer ({ className, selectedAccount }) {
  return (
    <footer
      className={`${className} footer d-flex flex-column flex-md-row px-4`}
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
        <a href="mailto:support@polkadot.network?subject=Gifts">
          support@polkadot.network
        </a>
      </div>
    </footer>
  );
}
