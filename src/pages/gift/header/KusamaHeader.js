import { Dropdown, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { stringHelpers } from '../../../utils';
import Identicon from '@polkadot/react-identicon';
import { Circle, DotsThree, ImageSquare } from 'phosphor-react';
import config from '../../../config';
import KusamaLogo from '../../../images/kusama_logo.png';
import KusamaIcon from '../../../images/kusama_icon.png';

const AccountInfoBox = ({ accountAddress }) => {
  const addressStr = stringHelpers.truncateMiddle(accountAddress, 5);
  return (
    <div className="d-flex align-items-center">
      <div className="flex-shrink-0 mr-1">
        <Identicon value={accountAddress} size={20} theme="kusama" />
      </div>
      <div className="flex-grow-1">
        <Row>
          <Col>
            <div className="text-left">{addressStr}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default function Header({ selectedAccount }) {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const location = useLocation();
  const alternativeApp = config.ALTERNATIVE_APP_URL;
  return (
    <>
      <Navbar
        className="px-3 px-sm-4 py-3"
        style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr 100px',
        }}
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="nav-pills shadow-sm">
            <Nav.Item>
              <Nav.Link
                className={location.pathname === '/claim' && 'active'}
                onClick={() => navigate('/claim')}
                onClick={() => navigate('/claim')}
              >
                Claim
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={location.pathname === '/generate' && 'active'}
                onClick={() => navigate('/generate')}
                onClick={() => navigate('/generate')}
              >
                New Gift
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center justify-content-end">
          {selectedAccount && (
            <>
              <div className="d-none d-sm-block w-100 d-sm-none" />
              <div className="d-none d-sm-block flex-grow-0 justify-content-end mr-2 shadow-sm border-0 p-0">
                <div
                  style={{
                    minWidth: '5rem',
                    fontWeight: '400',
                    height: '42px',
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
                onClick={() => navigate('/about')}
                onClick={() => navigate('/about')}
              >
                <ImageSquare className="mr-2" size={18} />
                About Gifts
              </Dropdown.Item>
              {alternativeApp && (
                <Dropdown.Item
                  className="px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(alternativeApp, '_blank');
                  }}
                >
                  <Circle className="mr-2" size={18} />
                  Gift DOT
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}
