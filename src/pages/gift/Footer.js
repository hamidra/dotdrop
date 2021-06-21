export default function Footer ({ selectedAccount }) {
  return (
    <footer
      className="footer d-flex px-4 py-3"
      expand="md"
    >
        <div className="d-flex flex-row">
          <div>© {new Date().getFullYear()} All rights reserved.&nbsp;&nbsp;·&nbsp;&nbsp;</div>
          <div>
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
        <div>
          <strong>Questions?</strong> <a href='mailto:support@polkadot.network?subject=Gifts'>support@polkadot.network</a>
        </div>
    </footer>
  );
}
