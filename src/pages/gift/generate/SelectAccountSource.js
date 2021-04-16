import { useContext } from 'react';
import AccountOptions from '../AccountOptions';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GenerateContext } from './GenerateMain';

export default function SelectAccountSource() {
  const { nextStep, setAccountSource } = useContext(GenerateContext);

  const optionSelectHandler = (accountSource) => {
    setAccountSource(accountSource);
    nextStep();
  };

  const sourceOptions = [
    {
      selectHandler: () => optionSelectHandler('IMPORTED_ACCOUNT'),
      label: 'KeyStore or mnemonic phrase',
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
        <Col>How would you like to access your account?</Col>
      </Row>
      <Row>
        <AccountOptions options={sourceOptions} />
      </Row>
    </>
  );
}
