import { Dropdown, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { stringHelpers } from '../../../utils';
import Identicon from '@polkadot/react-identicon';
import { Bird, DotsThree } from 'phosphor-react';
import PolkadotCircle from '../../../images/polkadot-circle-new.svg';
import config from '../../../config';

const AccountInfoBox = ({ accountAddress }) => {
  const addressStr = stringHelpers.truncateMiddle(accountAddress, 5);
  return (
    <div className="d-flex align-items-center">
      <div className="flex-shrink-0 mr-1">
        <Identicon value={accountAddress} size={20} theme="polkadot" />
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
  const alternativeApp = config.ALTERNATIVE_APP_URL;

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
              src={PolkadotCircle}
              alt={'Polkadot'}
            />
          </a>
        </Navbar.Brand>
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
              {alternativeApp && (
                <Dropdown.Item
                  className="px-3"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(alternativeApp, '_blank');
                  }}
                >
                  <Bird className="mr-2" size={18} />
                  Kusama NFTs
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}
