import { Container } from 'react-bootstrap';
import Claimed from './pages/gift/claim/Claimed';
import CreateAccount from './pages/gift/claim/CreateAccountOptions';
import StoreSecret from './pages/gift/claim/CreateNewAccount';
import VerifySecret from './pages/gift/claim/VerifySecret';
import GenerateGift from './pages/gift/generate/GenerateGift';
import LoadAccount from './pages/gift/generate/LoadAccounts';
import PresentGift from './pages/gift/generate/PresentGift';
import Greeting from './pages/gift/greeting';
import { SubstrateContextProvider } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ClaimMain from './pages/gift/claim/ClaimMain';

function Body() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/claim">
            <ClaimMain />
          </Route>
          <Route path="/generate">
            <LoadAccount />
          </Route>
          <Route exact path="/">
            <Greeting />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Body />
      <DeveloperConsole />
    </SubstrateContextProvider>
  );
}
