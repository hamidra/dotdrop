import { Dropdown, Nav, Navbar, Media, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { stringHelpers } from '../../../utils';
import Identicon from '@polkadot/react-identicon';
import { DotsThree, ImageSquare } from 'phosphor-react';
import KusamaLogo from '../../../images/kusama_logo.png';

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

  return (
    <>
      <Navbar
        className="px-4 py-3"
        style={{ display: 'grid', gridTemplateColumns: '0px 1fr 0px' }}
        variant="dark">
        <Navbar.Brand>
          <a
            href="https://kusama.network"
            target="_blank"
            rel="noopener noreferrer">
            <img width={120} className="p-1" src={KusamaLogo} alt={'Kusama'} />
          </a>
        </Navbar.Brand>
        <div className="d-flex align-items-center justify-content-end">
          {selectedAccount && (
            <>
              <div className="d-none d-sm-block w-100 d-sm-none" />
              <Nav className="d-none d-sm-block flex-grow-0 justify-content-end mr-2 shadow-sm">
                <div
                  style={{ minWidth: '5rem', fontWeight: '400' }}
                  className="account-box align-items-center text-center">
                  <AccountInfoBox accountAddress={selectedAccount} />
                </div>
              </Nav>
            </>
          )}
          <Dropdown id="dropdown-item-button">
            <Dropdown.Toggle
              className="btn-dropdown p-1 rounded shadow-sm"
              type="button"
              data-toggle="dropdown"
              id="dropdownMenuButton">
              <DotsThree size={30} weight="bold" />
            </Dropdown.Toggle>
            <Dropdown.Menu
              aria-labelledby="dropdownMenuButton"
              className="dropdown-menu-right mt-2 shadow">
              <Dropdown.Item
                className="px-3"
                onClick={() => history.push('/about')}>
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
