import React, { useState } from 'react';
import { Dropdown, Media, Form, Row, Col } from 'react-bootstrap';
import { stringHelpers } from '../../utils';
import Identicon from '@polkadot/react-identicon';

const namePaddingLen = 10;
const addressPaddingLen = 5;
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
        <Form className="mx-2 mb-2">
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

const CustomItem = React.forwardRef(
  ({ account, balance, onClick, active }, ref) => {
    const nameStr = stringHelpers.truncateMiddle(
      account?.meta?.name,
      namePaddingLen
    );
    const addressStr = stringHelpers.truncateMiddle(
      account?.address,
      addressPaddingLen
    );
    const balanceStr = `${balance}`;
    return (
      <>
        <Media
          className="d-flex align-items-center p-2 border-top"
          active={active}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}>
          <div className="mr-2">
            <Identicon value={account?.address} size={40} theme="polkadot" />
          </div>
          <Media.Body>
            <Row>
              <Col>
                <div>{nameStr}</div>
                <div>{addressStr}</div>
              </Col>
              <Col>
                <div className="text-md-right balance-text">{`${balanceStr} DOTs`}</div>
              </Col>
            </Row>
          </Media.Body>
        </Media>
      </>
    );
  }
);
export default function AccounSelector({
  accounts,
  balances,
  selectedAccount,
  setSelectedAccount,
}) {
  const selectAccountHandler = (idx) => {
    setSelectedAccount(accounts[idx]);
  };
  const shortName = stringHelpers.truncateMiddle(
    selectedAccount?.meta?.name,
    namePaddingLen
  );
  const shortAddress = stringHelpers.truncateMiddle(
    selectedAccount?.address,
    addressPaddingLen
  );
  const label = selectedAccount ? (
    <>
      <strong>{shortName}</strong> : {shortAddress}
    </>
  ) : (
    'Select an account'
  );
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
                balance={balances && balances[account?.address]}
                as={CustomItem}
              />
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
