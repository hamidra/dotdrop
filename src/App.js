import { Container, Navbar, Nav } from 'react-bootstrap';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';
import Processing from './components/Processing';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import ClaimMain from './pages/gift/claim/ClaimMain';
import GenerateMain from './pages/gift/generate/GenerateMain';
import Greeting from './pages/gift/Greeting';

function Header() {
  const history = useHistory();
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand onClick={() => history.push('/')}>
        Polkadot Gift
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={() => history.push('about')}>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => history.push('claim')}>
              Claim Gift
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => history.push('generate')}>
              New Gift
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
function Body() {
  const { apiState } = useSubstrate();
  return (
    <Container>
      <Switch>
        <Route path={'/about'}>
          <div />
        </Route>
        <Route path={'/claim'}>
          <ClaimMain />
        </Route>
        <Route path={'/generate'}>
          <GenerateMain />
        </Route>
        <Route exact path={'/'}>
          <Greeting />
        </Route>
        <Route path={'/'}>
          <Redirect to={'/'} />
        </Route>
      </Switch>
      <Processing
        show={apiState !== 'READY'}
        message="Connecting to the blockchain network..."
      />
    </Container>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Router>
        <Header />
        <Body />
        <DeveloperConsole />
      </Router>
    </SubstrateContextProvider>
  );
}
