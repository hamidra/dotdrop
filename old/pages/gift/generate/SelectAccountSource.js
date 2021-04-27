import { useContext } from 'react';
import AccountOptions from '../AccountOptions';
import { Row, Col } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
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
      <Row className="p-4">
        <Col>
          <Link to="/">
            <Button>{'< Back'}</Button>
          </Link>
        </Col>
      </Row>
      <Row className="py-3">
        <Col className="text-center">
          <h1>How would you like to access your account?</h1>
        </Col>
      </Row>
      <Row>
        <AccountOptions options={sourceOptions} />
      </Row>
    </>
  );
}
