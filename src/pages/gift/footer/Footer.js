import PolkadotFooter from './PolkadotFooter';
import KusamaFooter from './KusamaFooter';
import { useSubstrate } from '../../../substrate-lib';
export default function Footer ({ className }) {
  const { theme } = useSubstrate();
  switch (theme) {
    case 'kusama':
      return <KusamaFooter className={className} />;
    case 'kusamanft':
      return <KusamaFooter className={className} />;
    default:
      return <PolkadotFooter className={className} />;
  }
}
