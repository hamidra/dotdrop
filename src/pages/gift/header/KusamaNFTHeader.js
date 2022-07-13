import { Dropdown, Nav, Navbar, Media, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { stringHelpers } from '../../../utils';
import Identicon from '@polkadot/react-identicon';
import { DotsThree, ImageSquare } from 'phosphor-react';
import KusamaLogo from '../../../images/kusama_logo.png';
import KusamaIcon from '../../../images/kusama_icon.png';

const AccountInfoBox = ({ accountAddress }) => {
  const addressStr = stringHelpers.truncateMiddle(accountAddress, 5);
  return (
    <Media className="d-flex align-items-center">
      <Identicon
        className="mr-1"
        value={accountAddress}
        size={20}
        theme="kusama"
      />
      <Media.Body>
        <Row>
          <Col>
            <div className="text-left">{addressStr}</div>
          </Col>
        </Row>
      </Media.Body>
    </Media>
  );
};
export default function Header ({ selectedAccount }) {
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      <Navbar
        className="px-3 px-sm-4 py-3"
        style={{ display: 'grid', gridTemplateColumns: '100px 1fr 100px' }}
        variant="dark"
      >
        <Navbar.Brand>
          <a href="/" rel="noopener noreferrer">
            <img
              width={120}
              className="p-1 d-none d-sm-inline-block"
              src={KusamaLogo}
              alt={'Kusama'}
            />
            <img
              width={42}
              className="p-1 d-sm-none"
              src={KusamaIcon}
              alt={'Kusama'}
            />
          </a>
        </Navbar.Brand>
        <div className="d-flex align-items-center justify-content-end">
          {selectedAccount && (
            <>
              <div className="d-none d-sm-block w-100 d-sm-none" />
              <div className="d-none d-sm-block flex-grow-0 justify-content-end mr-2 shadow-sm border-0 p-0">
                <div
                  style={{
                    minWidth: '5rem',
                    fontWeight: '400',
                    height: '42px'
                  }}
                  className="account-box align-items-center text-center d-flex bg-transparent balance-text"
                >
                  <AccountInfoBox accountAddress={selectedAccount} />
                </div>
              </div>
            </>
          )}
          <Dropdown id="dropdown-item-button">
            <Dropdown.Toggle
              className="btn-dropdown p-1 rounded shadow-sm"
              type="button"
              data-toggle="dropdown"
              id="dropdownMenuButton"
            >
              <DotsThree size={30} weight="bold" />
            </Dropdown.Toggle>
            <Dropdown.Menu
              aria-labelledby="dropdownMenuButton"
              className="dropdown-menu-right mt-2 shadow"
            >
              <Dropdown.Item
                className="px-3"
                href="https://kusama.network/valentines/"
                target="_blank"
                rel="noopener noreferrer"
                role="link"
              >
                <ImageSquare className="mr-1" size={18} />
                About NFTs
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}
