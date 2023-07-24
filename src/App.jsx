import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import Processing from './components/Processing';
import AccountOverview from './pages/gift/accounts/AccountOverview';
import ExtensionOnboarding from './pages/gift/accounts/ExtensionOnboarding';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AboutMain from './pages/gift/about/AboutMain';
import ClaimMain from './pages/gift/claim/ClaimMain';
import GenerateMain from './pages/gift/generate/GenerateMain';
import PrivacyPolicy from './pages/gift/policy/PrivacyPolicy';
import GiftSecretScanner from './pages/gift/GiftSecretScanner';

function Body() {
  const { apiState, giftTheme } = useSubstrate();
  return (
    <>
      <Routes>
        <Route path={'/about'} element={<AboutMain />} />
        <Route
          path={'/claim'}
          element={
            <>
              <ClaimMain />
              <Processing
                show={apiState !== 'READY'}
                message={`Connecting to ${giftTheme.network}...`}
              />
            </>
          }
        />
        <Route
          path={'/generate'}
          element={
            <>
              <GenerateMain />
              <Processing
                show={apiState !== 'READY'}
                message={`Connecting to ${giftTheme.network}...`}
              />
            </>
          }
        />
        <Route
          path={'/account/:accountAddress'}
          element={
            <>
              <AccountOverview />
              <Processing
                show={apiState !== 'READY'}
                message={`Connecting to ${giftTheme.network}...`}
              />
            </>
          }
        />
        <Route
          path={'/giftScanner'}
          element={
            <>
              <GiftSecretScanner />
              <Processing
                show={apiState !== 'READY'}
                message={`Connecting to ${giftTheme.network}...`}
              />
            </>
          }
        />
        <Route
          path={'/extension/:accountAddress'}
          element={
            <>
              <ExtensionOnboarding />
              <Processing
                show={apiState !== 'READY'}
                message={`Connecting to ${giftTheme.network}...`}
              />
            </>
          }
        />
        <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />
        <Route path={'/'} element={<Navigate to={'/generate'} replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Router>
        <Body />
      </Router>
    </SubstrateContextProvider>
  );
}
