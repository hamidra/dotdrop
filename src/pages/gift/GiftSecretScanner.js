import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import CardHeader from '../../components/CardHeader';
import { useSubstrate, giftProvider } from '../../substrate-lib';
import { stringHelpers } from '../../utils';
import config from '../../config';

export default function GiftSecretScanner () {
  const { keyring, api, apiState, giftTheme } = useSubstrate();
  const [giftSecret, setGiftSecret] = useState('');
  const [giftSecretError, setGiftSecretError] = useState(null);
  const [giftAccountPair, setGiftAccountPair] = useState(null);
  const [giftAssets, setGiftAssets] = useState();

  const validate = (secret) => {
    const error = stringHelpers.validateGiftSecret(secret) || null;
    return error;
  };

  const scanGiftSecret = async () => {
    const secret = stringHelpers.removeSpaces(giftSecret);
    console.log(secret);
    const error = validate(secret);
    if (!error) {
      const giftAccountPair = keyring.createFromUri(
        secret,
        { name: 'interim_gift' },
        'sr25519'
      );
      setGiftAccountPair(giftAccountPair);
      console.log(giftAccountPair?.address);
      if (api) {
        const giftAccount = { pairOrAddress: giftAccountPair };
        const assets = await giftProvider?.queryGift(api, giftAccount);
        setGiftAssets(assets);
        console.log(assets);
      }
    } else {
      setGiftSecretError(error);
    }
  };

  const _setGiftSecret = (secret) => {
    setGiftAccountPair(null);
    setGiftSecret(secret);
  };

  return (
    <>
      <Container>
        <Row className="my-2 my-md-5 justify-content-center align-items-center">
          <Col className="my-md-3 d-flex justify-content-center align-items-center">
            <Card
              style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
              className="shadow"
            >
              <Card.Body className="d-flex flex-column">
                <CardHeader
                  title={'Scan A Gift'}
                  cardText={[
                    'Enter the ',
                    <b>gift secret</b>,
                    ' to browse the gift and scan the gift transactions.'
                  ]}
                />
                <>
                  <Row className="pt-4 justify-content-center align-items-center">
                    <Col>
                      <Form autoComplete="off" className="w-100">
                        <Form.Group>
                          <Form.Label htmlFor="giftSecret">
                            Gift Secret
                          </Form.Label>
                          <Form.Control
                            id="giftSecret"
                            name="giftSecret"
                            type="input"
                            isInvalid={giftSecretError}
                            value={giftSecret}
                            onChange={(e) => _setGiftSecret(e?.target?.value)}
                          />
                          {giftSecretError && (
                            <Form.Text className="danger">
                              {giftSecretError}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                  <Row className="justify-content-center align-items-center">
                    <Col className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary"
                        disabled={!keyring || !api}
                        onClick={() => scanGiftSecret()}
                      >
                        Query Gift
                      </button>
                    </Col>
                  </Row>
                  {giftAccountPair?.address && (
                    <Row className="pt-3">
                      <Col className="12">
                        <h4>Address</h4>
                        <div>{giftAccountPair?.address}</div>
                      </Col>
                      <Col className="12">
                        <div className="mt-4">
                          <a
                            href={`${config.CHAIN_SCANNER_URL}/account/${giftAccountPair?.address}?tab=transfer`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {'→ See account on Subscan'}
                          </a>
                        </div>
                      </Col>
                    </Row>
                  )}
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
