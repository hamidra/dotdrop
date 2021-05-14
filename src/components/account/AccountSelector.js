import React, { useState } from 'react';
import { Dropdown, Row, Col, Form } from 'react-bootstrap';
import { stringHelpers } from '../../utils';

const CustomMenu = React.forwardRef(
  (
    { children, style, className, 'aria-labelledby': labeledBy, account },
    ref
  ) => {
    const [value, setValue] = useState('');
    const filteredChildren = React.Children.toArray(children).filter(
      ({ props: { account } }) => {
        let str = '';
        if (account?.address) {
          str += ` ${account.address} `;
        }
        if (account?.meta?.name) {
          str += ` ${account.meta.name} `;
        }
        return !value || str.toLowerCase().includes(value.toLowerCase());
      }
    );

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}>
        <Form className="mx-2">
          <Form.Control
            autoFocus
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </Form>
        <ul className="list-unstyled">{filteredChildren}</ul>
      </div>
    );
  }
);

const CustomItem = React.forwardRef(({ account, onClick }, ref) => {
  const nameStr = stringHelpers.truncateMiddle(account?.meta?.name, 10);
  const addressStr = stringHelpers.truncateMiddle(account?.address, 5);
  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}>
        <div>{nameStr}</div>
        <div>{addressStr}</div>
      </div>
    </>
  );
});
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
        <Dropdown.Menu style={{ minWidth: '100%' }} as={CustomMenu}>
          {accounts.map((account, idx) => {
            return (
              <Dropdown.Item
                eventKey={idx}
                active={account.address === selectedAccount?.address}
                account={account}
                as={CustomItem}
              />
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
