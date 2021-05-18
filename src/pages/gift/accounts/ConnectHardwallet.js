import CardHeader from '../../../components/CardHeader';
import { Row, Col, Card } from 'react-bootstrap';
import { isWeb3Injected } from '@polkadot/extension-dapp';
export default function HardwalletAccount({ prevStepHandler, actionTitle }) {
  const title = 'Import your Ledger Account';
  const extensionLink = 'https://polkadot.js.org/extension/';
  return (
    <>
      <Card.Body>
        <CardHeader title={title} backClickHandler={prevStepHandler} />
        <Row className="p-5 justify-content-center">
          <Col
            style={{ height: 200 }}
            className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <ol>
                <li className="mb-3">
                  <a
                    href="https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT-"
                    target="_blank">
                    Install polkadot App and create a polkadot account on your
                    Ledger device.
                  </a>
                </li>
                <li className="mb-3">
                  <a href={`${extensionLink}`} target="_blank">
                    Add your ledger account into Polkadot extension.
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT-"
                    target="_blank">
                    Connect your ledger account to {`${actionTitle || ''}`}
                  </a>
                </li>
              </ol>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
