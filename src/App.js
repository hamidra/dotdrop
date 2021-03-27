import React, { useState, createRef } from 'react';

import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

function Main() {
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
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
