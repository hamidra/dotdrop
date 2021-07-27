import CardHeader from '../../../../components/CardHeader';
import { Row, Col, Card } from 'react-bootstrap';
import { CaretRight, DownloadSimple, Plus } from 'phosphor-react';
import { useSubstrate } from '../../../../substrate-lib';

const CardLink = ({ title, subtitle, hRef }) => {
  return (
    <a
      className="card-link d-flex flex-row"
      href={hRef}
      rel="noreferrer"
      target="_blank">
        {title === 'Step 1'
          ? <DownloadSimple className="flex-shrink-0 p-2 rounded icon" size={48} />
          : <Plus className="flex-shrink-0 p-2 rounded icon" size={48} />
      }
      <div>
        <h5 style={{ marginBottom: '0.25rem' }}>{title}</h5>
        <div className="subtitle">{subtitle}</div>
      </div>
      <div className="d-flex flex-grow-1"/>
      <CaretRight className="caret flex-shrink-0" size={14} weight="bold" />
    </a>
  );
};

export default function LedgerInstructions ({
  prevStepHandler,
  nextStepHandler
}) {
  const title = 'Import Ledger Account';
  const extensionLink = 'https://polkadot.js.org/extension/';
  const { giftTheme } = useSubstrate();
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={title}
          backClickHandler={prevStepHandler}
          cardText="Follow below instructions to import your Ledger account into Polkadot extension."
        />
        <Row className="justify-content-center">
          <Col sm="11">
            <CardLink
              hRef="https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT"
              title="Step 1"
              subtitle={`Install the ${giftTheme?.network} app on your Ledger device`}
            />
          </Col>
        </Row>
        <Row className="justify-content-center py-3">
          <Col sm="11">
            <CardLink
              hRef={extensionLink}
              title="Step 2"
              subtitle="Add your Ledger account to the Polkadot Extension"
            />
          </Col>
        </Row>
        <div className="d-flex flex-grow-1" />
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
