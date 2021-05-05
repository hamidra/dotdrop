import { Dropdown } from 'react-bootstrap';
import { stringHelpers } from '../../utils';
export default function AccounSelector({
  accounts,
  maxStrlength,
  selectedAccount,
  setSelectedAccount,
}) {
  const selectAccountHandler = (idx) => {
    setSelectedAccount(accounts[idx]);
  };
  let label = selectedAccount
    ? selectedAccount?.meta?.name || selectedAccount.address
    : 'Select an account';
  label = stringHelpers.truncateMiddle(label, maxStrlength);
  return (
    <>
      <Dropdown
        className="w-100"
        onSelect={(eventKey, e) => selectAccountHandler(eventKey)}>
        <Dropdown.Toggle
          variant="outline-primary"
          id="dropdown-item-button"
          className="w-100 rounded">
          {label}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ minWidth: '100%' }}>
          {accounts.map((account, idx) => {
            let accountStr = account?.meta?.name || account.address;
            accountStr = stringHelpers.truncateMiddle(accountStr, maxStrlength);
            return (
              <Dropdown.Item
                eventKey={idx}
                active={account.address === selectedAccount?.address}>
                {accountStr}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
