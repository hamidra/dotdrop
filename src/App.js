import { Container } from 'react-bootstrap';
import Claimed from './pages/gift/claim/Claimed';
import CreateAccount from './pages/gift/claim/CreateAccount';
import StoreSecret from './pages/gift/claim/StoreSecret';
import VerifySecret from './pages/gift/claim/VerifySecret';
import GenerateGift from './pages/gift/generate/GenerateGift';
import LoadAccount from './pages/gift/generate/LoadAccounts';
import PresentGift from './pages/gift/generate/PresentGift';
import Greeting from './pages/gift/greeting';

function App() {
  return (
    <Container>
      <PresentGift />
    </Container>
  );
}

export default App;
