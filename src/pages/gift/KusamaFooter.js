import { Link, useHistory } from 'react-router-dom';

export default function Footer ({ selectedAccount }) {
  const history = useHistory();

  return (
    <footer
      className="footer d-flex px-4 py-3"
      variant="dark"
      expand="md"
    >
        <div className="d-flex flex-row">
          <div>© {new Date().getFullYear()} All rights reserved.&nbsp;·&nbsp;</div>
          <div>
            <span>
              <Link onClick={() => history.push('/privacy-policy')}>
                Privacy Policy
              </Link>
            </span>
          </div>
        </div>
        <div className="footer-grow flex-grow-1" />
        <div>
          <strong>Questions?</strong> <a href='mailto:support@kusama.network?subject=NFTs'>support@kusama.network</a>
        </div>
    </footer>
  );
}
