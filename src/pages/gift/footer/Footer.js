import PolkadotFooter from './PolkadotFooter';
import KusamaFooter from './KusamaFooter';
import { useSubstrate } from '../../../substrate-lib';
export default function Footer () {
  const { theme } = useSubstrate();
  switch (theme) {
    case 'kusama':
      return <KusamaFooter />;
    case 'kusamanft':
      return <KusamaFooter />;
    default:
      return <PolkadotFooter />;
  }
}
