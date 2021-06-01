import { Container, Nav, Navbar, Media, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { stringHelpers } from '../../utils';
import Identicon from '@polkadot/react-identicon';

const AccountInfoBox = ({ accountAddress }) => {
  const addressStr = stringHelpers.truncateMiddle(accountAddress, 5);
  return (
    <Media className="d-flex align-items-center">
      <div>
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
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Navbar
        className="pl-5 pr-4 py-3"
        variant="dark"
        expand="sm">
        <Container>
          {/* <Navbar.Brand onClick={() => history.push('/')}>
            <strong>{location.pathname}</strong>
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center">
            <Nav className='nav-pills shadow-sm p-1'>
              {/* <Nav.Item>
                <Nav.Link onClick={() => history.push('/about')}>
                  About
                </Nav.Link>
              </Nav.Item> */}
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
          {selectedAccount && (
            <>
              <div className="w-100 d-sm-none" />
              <Nav className="flex-grow-0 justify-content-end">
                <div
                  style={{ minWidth: '5rem' }}
                  className="py-1 px-2 bg-white text-dark rounded text-center">
                  <AccountInfoBox accountAddress={selectedAccount} />
                </div>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}
