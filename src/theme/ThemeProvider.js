import React from 'react';
import { useSubstrate } from '../substrate-lib';

const PolkadotTheme = React.lazy(() => import('./PolkadotTheme'));
const KusamaTheme = React.lazy(() => import('./KusamaTheme'));

const ThemeProvider = ({ children }) => {
  const { giftTheme } = useSubstrate();
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(giftTheme?.network === 'polkadot') && <PolkadotTheme />}
        {(giftTheme?.network === 'Kusama') && <KusamaTheme />}
      </React.Suspense>
      {children}
    </>
  );
};

export default ThemeProvider;
