import { DropdownButton, Dropdown, Button, ButtonGroup } from 'react-bootstrap';
export default function AccounSelector({
  accounts,
  selectedAccount,
  setSelectedAccount,
}) {
  const selectAccountHandler = (idx) => {
    setSelectedAccount(accounts[idx]);
  };

  return (
    <>
      <Dropdown
        className="w-100"
        as={ButtonGroup}
        onSelect={(eventKey, e) => selectAccountHandler(eventKey)}>
        <Dropdown.Toggle
          variant="outline-primary"
          id="dropdown-item-button"
          className="w-100"
          size="lg">
          {selectedAccount
            ? selectedAccount?.meta?.name || selectedAccount.address
            : 'Select an account'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {accounts.map((account, idx) => {
            return (
              <Dropdown.Item
                eventKey={idx}
                active={account.address === selectedAccount?.address}>
                {account?.meta?.name || account.address}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
