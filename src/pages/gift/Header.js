import { Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { stringHelpers } from '../../utils';
import AccountSelector from '../../components/account/AccountSelector';

export default function Header({ selectedAccount }) {
  const history = useHistory();

  return (
    <>
      <Navbar
        bg="primary"
        className="pl-5 pr-4 py-3"
        variant="dark"
        expand="md">
        <Container>
          <Navbar.Brand onClick={() => history.push('/')}>
            <strong>Polkadot Gifts</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={() => history.push('/about')}>
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => history.push('/claim')}>
                  Claim Gift
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => history.push('/generate')}>
                  New Gift
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          {selectedAccount && (
            <div
              style={{ minWidth: '5rem' }}
              className="py-1 px-2 mx-2 bg-white text-dark rounded text-center">
              {stringHelpers.truncateMiddle(selectedAccount, 5)}
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
}
