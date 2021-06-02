import { Gift, PaperPlaneTilt, Smiley } from 'phosphor-react';

export default function ProcessExplainerCard() {
  return (
    <div
      className="d-flex flex-column align-items-center w-100 mb-5"
      style={{
        background:
          'linear-gradient(74.98deg, #E6007C 0%, #E6007A 36.28%, #7300E6 100%)',
        borderRadius: '1.5rem',
        color: '#FFF',
        padding: '5rem',
      }}>
      <h2
        className="text-center"
        style={{ fontSize: '3.3rem', marginBottom: '6rem' }}>
        How to Gift DOT
      </h2>
      <div className="row flex-grow-1 text-center">
        <div className="col">
          <Gift className="mb-4" size={94} />
          <h3 className="mb-3">Create Gift</h3>
          <div>Enter your gift amount and generate a unique gift secret.</div>
        </div>
        <div className="col">
          <div className="mb-4">
            <PaperPlaneTilt size={82} style={{ margin: '6px' }} />
          </div>
          <h3 className="mb-3">Share Gift</h3>
          <div>Send the unique gift secret to a friend or family member.</div>
        </div>
        <div className="col">
          <Smiley className="mb-4" size={94} />
          <h3 className="mb-3">Claim Gift</h3>
          <div>
            The recipient uses a new or existing Polkadot account to claim their gift.
          </div>
        </div>
      </div>
    </div>
  );
}
