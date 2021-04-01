import { useState, useEffect } from 'react';
import { Select, Box } from 'grommet';
import { useSubstrate } from './substrate-lib';

function Accounts ({ setAccountAddress }) {
  const { keyring } = useSubstrate();
  const [accountSelected, setAccountSelected] = useState('');

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map((account) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user'
  }));

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : '';

  // Set the initial address
  useEffect(() => {
    setAccountAddress && setAccountAddress(initialAddress);
    setAccountSelected(initialAddress);
  }, [setAccountAddress, initialAddress]);

  const setAccount = (address) => {
    setAccountAddress && setAccountAddress(address);
    setAccountSelected(address);
  };

  return (
    <Select
      options={keyringOptions}
      value = {accountSelected}
      valueKey = {{ key: 'value', reduce: true }}
      labelKey = 'text'
      children={(option, index, options, state) => (<Box>{option.text}</Box>)}
      onChange={({ value }) => setAccount(value)}
    />
  );
}

export default function AccountSelector (props) {
  const { api, keyring } = useSubstrate();
  return keyring?.getPairs && api?.query ? <Accounts {...props} /> : null;
}
