import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';
import Processing from './components/Processing';
import AccountOverview from './pages/gift/accounts/AccountOverview';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ClaimMain from './pages/gift/claim/ClaimMain';
import GenerateMain from './pages/gift/generate/GenerateMain';

function Body() {
  const { apiState } = useSubstrate();
  return (
    <>
      <Switch>
        <Route path={'/about'}>
          <GenerateMain />
        </Route>
        <Route path={'/claim'}>
          <ClaimMain />
        </Route>
        <Route path={'/generate'}>
          <GenerateMain />
        </Route>
        <Route path={'/account/:accountAddress'}>
          <AccountOverview />
        </Route>
        <Route exact path={'/'}>
          <GenerateMain />
        </Route>
        <Route path={'/'}>
          <Redirect to={'/'} />
        </Route>
      </Switch>
      <Processing
        show={apiState !== 'READY'}
        message="Connecting to the blockchain network..."
      />
    </>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Router>
        <Body />
        <DeveloperConsole />
      </Router>
    </SubstrateContextProvider>
  );
}
