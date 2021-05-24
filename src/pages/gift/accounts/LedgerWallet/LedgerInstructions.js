import CardHeader from '../../../../components/CardHeader';
import { Row, Col, Card, Image } from 'react-bootstrap';
import Button from '../../../../components/CustomButton';
import { isWeb3Injected } from '@polkadot/extension-dapp';
import ledgerInstall from '../../../../images/ledger-install.png';
import extensionAdd from '../../../../images/extension-add.png';
import extensionLedger from '../../../../images/extension-ledger.png';

export default function LedgerInstructions({
  prevStepHandler,
  nextStepHandler,
}) {
  const title = 'Import Ledger Account';
  const extensionLink = 'https://polkadot.js.org/extension/';
  return (
    <>
      <Card.Body>
        <CardHeader
          title={title}
          backClickHandler={prevStepHandler}
          cardText="Follow below instructions to import your Ledger account into Polkadot extension."
        />
        <Row className="py-5 justify-content-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <ul>
                <li className="mb-5">
                  <div className="mb-3">
                    <span className="step-text">
                      Install polkadot App and create a polkadot account on your
                      Ledger device.&nbsp;
                    </span>
                    <a
                      href="https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT-"
                      rel="noreferrer"
                      target="_blank">
                      learn more
                    </a>
                  </div>
                  <div className="d-flex flex-column">
                    <Image
                      src={ledgerInstall}
                      className="rounded align-self-end image-box"
                    />
                  </div>
                </li>
                <li className="step-item">
                  <div className="mb-3">
                    <span className="step-text">
                      Add your Ledger account to Polkadot extension.&nbsp;
                    </span>
                    <a
                      href={`${extensionLink}`}
                      rel="noreferrer"
                      target="_blank">
                      learn more
                    </a>
                  </div>
                  <div className="d-flex flex-column">
                    <Image
                      src={extensionAdd}
                      className="rounded align-self-end image-box mb-2"
                    />
                    <Image
                      src={extensionLedger}
                      className="rounded align-self-start image-box"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="pt-4 d-flex justify-content-center">
            <Button onClick={() => nextStepHandler()}>Connect</Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
