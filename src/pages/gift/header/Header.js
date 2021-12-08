import PolkadotHeader from './PolkadotHeader';
import PolkadotNFTHeader from './PolkadotNFTHeader';
import KusamaHeader from './KusamaHeader';
import KusamaNFTHeader from './KusamaNFTHeader';
import { useSubstrate } from '../../../substrate-lib';
export default function Header (props) {
  const { theme } = useSubstrate();
  switch (theme) {
    case 'kusama':
      return <KusamaHeader {...props} />;
    case 'kusamanft':
      return <KusamaNFTHeader {...props} />;
    case 'polkadot':
      return <PolkadotHeader {...props} />;
    case 'polkadotnft':
      return <PolkadotNFTHeader {...props} />;
    default:
      return <PolkadotHeader {...props} />;
  }
}
