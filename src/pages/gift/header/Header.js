import PolkadotHeader from './PolkadotHeader';
import KusamaHeader from './KusamaHeader';
import { useSubstrate } from '../../../substrate-lib';
export default function Header (props) {
  const { theme } = useSubstrate();
  switch (theme) {
    case 'kusama':
      return <KusamaHeader {...props} />;
    case 'kusamanft':
      return <KusamaHeader {...props} />;
    default:
      return <PolkadotHeader {...props} />;
  }
}
