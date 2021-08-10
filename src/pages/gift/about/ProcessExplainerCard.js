import { Gift, PaperPlaneTilt, Smiley } from 'phosphor-react';

export default function ProcessExplainerCard ({ giftTheme }) {
  return (
    <div
      className="explainer-card bg-animated d-flex flex-column align-items-center w-100 mb-5">
      <h2
        className="text-center"
        style={{ fontSize: '3.3rem', marginBottom: '6rem' }}>
        How to Gift {giftTheme.content}
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
            The recipient uses a new or existing {giftTheme.network} account to claim their gift.
          </div>
        </div>
      </div>
    </div>
  );
}
