import { Dropdown, Nav, Navbar, Media, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { stringHelpers } from '../../../utils';
import Identicon from '@polkadot/react-identicon';
import { Bird, DotsThree, Gift } from 'phosphor-react';
import PolkadotCircle from '../../../images/polkadot-circle-new.svg';
import WestendLogo from '../../../images/westend.svg';
import config from '../../../config';
import { useSubstrate } from '../../../substrate-lib';

const AccountInfoBox = ({ accountAddress }) => {
  const addressStr = stringHelpers.truncateMiddle(accountAddress, 5);
  return (
    <Media className="d-flex align-items-center">
      <div className="mr-1">
        <Identicon value={accountAddress} size={20} theme="polkadot" />
      </div>
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
export default function Header({ selectedAccount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const alternativeApp = config.ALTERNATIVE_APP_URL;
  const { theme } = useSubstrate();
  return (
    <>
      <Navbar
        className="px-4 py-3"
        style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 60px',
        }}
        variant="dark"
      >
        <Navbar.Brand>
          <a href="/" rel="noopener noreferrer">
            <img
              className="shadow-sm rounded-circle p-1 logo"
              src={theme == 'westend' ? WestendLogo : PolkadotCircle}
              alt={'Polkadot'}
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="nav-pills shadow-sm p-1">
            <Nav.Item>
              <Nav.Link
                className={location.pathname === '/claim' && 'active'}
                onClick={() => navigate('/claim')}
              >
                Claim
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={location.pathname === '/generate' && 'active'}
                onClick={() => navigate('/generate')}
              >
                New Gift
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex justify-content-end">
          {selectedAccount && (
            <>
              <div className="d-none d-sm-block w-100 d-sm-none" />
              <Nav className="d-none d-sm-block flex-grow-0 justify-content-end mr-2 shadow-sm rounded">
                <div
                  style={{
                    minWidth: '5rem',
                    fontWeight: '400',
                  }}
                  className="py-2 px-3 bg-white rounded text-center h-100 d-flex"
                >
                  <AccountInfoBox accountAddress={selectedAccount} />
                </div>
              </Nav>
            </>
          )}
          <Dropdown id="dropdown-item-button">
            <Dropdown.Toggle
              className="btn-dropdown p-2 rounded shadow-sm"
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
              >
                <Gift className="mr-2" size={18} />
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
                  <Bird className="mr-2" size={18} />
                  Gift KSM
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}
