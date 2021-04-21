import { useContext } from 'react';
import AccountOptions from '../AccountOptions';
import { Row, Col } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
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
      <Row className="p-4">
        <Col>
          <Link to="/">
            <Button>{'< Back'}</Button>
          </Link>
        </Col>
      </Row>
      <Row className="py-3">
        <Col className="text-center">
          <h1>Let’s deposit your gift to your Polkadot Account</h1>
        </Col>
      </Row>
      <Row>
        <AccountOptions options={sourceOptions} />
      </Row>
    </>
  );
}
