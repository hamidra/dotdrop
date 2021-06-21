export default function Footer ({ selectedAccount }) {
  return (
    <footer
      className="footer d-flex flex-column flex-md-row px-4 py-3"
      expand="md"
    >
        <div className="d-flex flex-column flex-sm-row">
          <div className="my-2 my-md-0">© {new Date().getFullYear()} All rights reserved.<span className='d-none d-sm-inline'>&nbsp;&nbsp;·&nbsp;&nbsp;</span></div>
          <div className="my-2 my-md-0">
            <span>
              <a href="policy" target="_blank">
                Terms &amp; Conditions
              </a>
            </span>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <span>
              <a href="policy" target="_blank">
                Privacy Policy
              </a>
            </span>
          </div>
        </div>
        <div className="footer-grow flex-grow-1" />
        <div className="my-2 my-md-0">
          <strong>Questions?</strong> <a href='mailto:support@polkadot.network?subject=Gifts'>support@polkadot.network</a>
        </div>
    </footer>
  );
}
