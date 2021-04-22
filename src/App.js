import { Container } from 'react-bootstrap';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';
import Processing from './components/Processing';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import ClaimMain from './pages/gift/claim/ClaimMain';
import GenerateMain from './pages/gift/generate/GenerateMain';
import Greeting from './pages/gift/Greeting';

function Body() {
  const { apiState } = useSubstrate();
  return (
    <Container>
      <Router>
        <Switch>
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
      </Router>
    </Container>
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
