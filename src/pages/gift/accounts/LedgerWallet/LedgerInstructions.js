import CardHeader from '../../../../components/CardHeader';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { isWeb3Injected } from '@polkadot/extension-dapp';
import ledgerInstall from '../../../../images/ledger-install.png';
import extensionAdd from '../../../../images/extension-add.png';
import extensionLedger from '../../../../images/extension-ledger.png';
import { useSubstrate } from '../../../../substrate-lib';

export default function LedgerInstructions ({
  prevStepHandler,
  nextStepHandler
}) {
  const title = 'Import Ledger Account';
  const extensionLink = 'https://polkadot.js.org/extension/';
  const { giftTheme } = useSubstrate();
  return (
    <>
      <Card.Body>
        <CardHeader
          title={title}
          backClickHandler={prevStepHandler}
          cardText="Follow below instructions to import your Ledger account into Polkadot extension."
        />
        <Row className="justify-content-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <ul>
                <li className="mb-5">
                  <div className="mb-3">
                    <span className="step-text">
                      {`Install ${giftTheme?.network} App and create a ${giftTheme?.network} account on your
                      Ledger device. `}
                    </span>
                    <a
                      href="https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT-"
                      rel="noreferrer"
                      target="_blank">
                      → Learn more
                    </a>
                  </div>
                  <div className="d-flex flex-column">
                    <Image
                      src={ledgerInstall}
                      className="rounded align-self-center image-box"
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
                      → Learn more
                    </a>
                  </div>
                  <div className="d-flex flex-column">
                    <Image
                      src={extensionAdd}
                      className="rounded align-self-center image-box mb-2"
                    />
                    <Image
                      src={extensionLedger}
                      className="rounded align-self-center image-box"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="pt-4 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => nextStepHandler()}>
              Connect
            </button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
