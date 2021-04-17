import { useContext } from 'react';
import AccountOptions from '../AccountOptions';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClaimContext } from './ClaimMain';

export default function SelectAccountSource() {
  const { nextStep, setAccountSource } = useContext(ClaimContext);

  const optionSelectHandler = (accountSource) => {
    setAccountSource(accountSource);
    nextStep();
  };

  const sourceOptions = [
    {
      selectHandler: () => optionSelectHandler('NEW_ACCOUNT'),
      label: 'Create new Account',
    },
    {
      selectHandler: () => optionSelectHandler('EXTENSION_ACCOUNT'),
      label: 'Polkadot extension',
    },
    {
      selectHandler: () => optionSelectHandler('HARDWALLET_ACCOUNT'),
      label: 'Hardware Wallet',
    },
    {
      selectHandler: () => optionSelectHandler('SIGNER_ACCOUNT'),
      label: 'Parity Signer',
    },
  ];
  return (
    <>
      <Row>
        <Col>
          <Link to="/">
            <Button>Back</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>Let’s deposit your gift to your Polkadot Account</Col>
      </Row>
      <Row>
        <AccountOptions options={sourceOptions} />
      </Row>
    </>
  );
}
