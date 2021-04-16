import { DropdownButton, Dropdown } from 'react-bootstrap';
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
      <DropdownButton
        variant="outline-primary"
        id="dropdown-item-button"
        title={
          selectedAccount
            ? selectedAccount?.meta?.name || selectedAccount.address
            : 'Select an account'
        }
        size="lg"
        onSelect={(eventKey, e) => selectAccountHandler(eventKey)}>
        {accounts.map((account, idx) => {
          return (
            <Dropdown.Item
              eventKey={idx}
              active={account.address === selectedAccount?.address}>
              {account?.meta?.name || account.address}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </>
  );
}
