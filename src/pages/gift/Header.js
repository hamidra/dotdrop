import { Dropdown, Nav, Navbar, Media, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { stringHelpers } from '../../utils';
import Identicon from '@polkadot/react-identicon';
import { DotsThree, Gift } from 'phosphor-react';
import PolkadotCircle from '../../images/polkadot-circle.png';

const AccountInfoBox = ({ accountAddress }) => {
  const addressStr = stringHelpers.truncateMiddle(accountAddress, 5);
  return (
    <Media className="d-flex align-items-center">
      <div className='mr-1'>
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
export default function Header ({ selectedAccount }) {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Navbar
        className="px-4 py-3"
        style={{ display: 'grid', gridTemplateColumns: '60px 1fr 60px' }}
        variant="dark"
        /* expand="sm" */
      >
        <Navbar.Brand>
          <a
            href='https://polkadot.network'
            target="_blank"
            rel="noopener noreferrer"
          >
          <img
            width={40}
            className='p-1 shadow-sm rounded-circle'
            src={PolkadotCircle}
            alt={'Polkadot'}
          />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center">
          <Nav className='nav-pills shadow-sm p-1'>
            <Nav.Item>
              <Nav.Link
                className={location.pathname === '/claim' && 'active'}
                onClick={() => history.push('/claim')}
              >
                Claim Gift
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={location.pathname === '/generate' && 'active'}
                onClick={() => history.push('/generate')}
              >
                New Gift
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <div className='d-flex justify-content-end'>
          {selectedAccount && (
            <>
              <div className="d-none d-sm-block w-100 d-sm-none" />
              <Nav className="d-none d-sm-block flex-grow-0 justify-content-end p-1 mr-2 shadow-sm">
                <div
                  style={{ minWidth: '5rem', fontWeight: '400' }}
                  className="py-1 px-3 bg-white rounded text-center">
                  <AccountInfoBox accountAddress={selectedAccount} />
                </div>
              </Nav>
            </>
          )}
          <Dropdown
            id="dropdown-item-button"
          >
            <Dropdown.Toggle
              className='p-1 rounded shadow-sm'
              type="button"
              data-toggle="dropdown"
              id="dropdownMenuButton"
            >
            <DotsThree size={30} weight="bold" />
            </Dropdown.Toggle>
            <Dropdown.Menu
              aria-labelledby="dropdownMenuButton"
              className='dropdown-menu-right mt-2 shadow'
            >
              <Dropdown.Item
                className='px-3'
                onClick={() => history.push('/about')}
              >
                <Gift className='mr-1' size={18} />About Gifts
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}
