import { Link } from 'react-router-dom';

export default function Footer({ variant, selectedAccount }) {
  return (
    <footer
      className={`${variant} footer d-flex flex-column flex-md-row px-4 py-3`}
      expand="md">
      <div className="d-flex flex-column flex-sm-row">
        <div className="my-2 my-md-0">
          © {new Date().getFullYear()} All rights reserved.
          <span className="d-none d-sm-inline">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
        <div className="my-2 my-md-0">
          <span>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </span>
        </div>
      </div>
      <div className="footer-grow flex-grow-1" />
      <div>
        <strong>Questions?</strong>
        <a href="mailto:support@kusama.network?subject=NFTs">
          support@kusama.network
        </a>
      </div>
    </footer>
  );
}
