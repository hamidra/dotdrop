import { Grommet, grommet, Box, Button } from 'grommet';
import First from './pages/first';
import { Second } from './pages/second';

import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

const ChainMeta = () => {
  const { api, apiState, keyring, keyringState, apiError } = useSubstrate();
  if (apiState === 'ERROR') return <div>apiError</div>;
  else if (apiState !== 'READY') return <div>"Connecting to Substrate"</div>;

  if (keyringState !== 'READY') {
    return (
      <div>
        "Loading accounts (please review any extension's authorization)"
      </div>
    );
  }

  return (
    <div>
      <p>
        <pre>
          {JSON.stringify(api.runtimeMetadata.asLatest.toHuman(), null, 2)}
        </pre>
      </p>
      <DeveloperConsole />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <SubstrateContextProvider>
        <Grommet theme={grommet}>
          <First />
        </Grommet>
        <DeveloperConsole />
      </SubstrateContextProvider>
    </div>
  );
}
