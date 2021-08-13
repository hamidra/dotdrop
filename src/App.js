import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';
import Processing from './components/Processing';
import AccountOverview from './pages/gift/accounts/AccountOverview';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import AboutMain from './pages/gift/about/AboutMain';
import ClaimMain from './pages/gift/claim/ClaimMain';
import GenerateMain from './pages/gift/generate/GenerateMain';
import PrivacyPolicy from './pages/gift/policy/PrivacyPolicy';

function Body () {
  const { apiState } = useSubstrate();

  return (
    <>
      <Switch>
        <Route path={'/about'}>
          <AboutMain />
        </Route>
        <Route path={'/claim'}>
          <ClaimMain />
          <Processing
            show={apiState !== 'READY'}
            message="Connecting to the blockchain network..."
          />
        </Route>
        <Route path={'/generate'}>
          <GenerateMain />
          <Processing
            show={apiState !== 'READY'}
            message="Connecting to the blockchain network..."
          />
        </Route>
        <Route path={'/account/:accountAddress'}>
          <AccountOverview />
          <Processing
            show={apiState !== 'READY'}
            message="Connecting to the blockchain network..."
          />
        </Route>
        <Route path={'/privacy-policy'}>
          <PrivacyPolicy />
        </Route>
        <Route path={'/'}>
          <Redirect to={'/generate'} />
        </Route>
      </Switch>
    </>
  );
}

export default function App () {
  return (
    <SubstrateContextProvider>
      <Router>
        <Body />
      </Router>
      <DeveloperConsole />
    </SubstrateContextProvider>
  );
}
