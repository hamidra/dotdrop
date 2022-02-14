import { Gift, PaperPlaneTilt, Smiley } from 'phosphor-react';

export default function ProcessExplainerCard ({ giftTheme }) {
  return (
    <div
      className="d-flex flex-column align-items-center w-100 mb-5">
      <h2
        className="text-center"
        style={{ fontSize: '3.3rem', marginBottom: '6rem' }}>
        How to Gift {giftTheme.content}
      </h2>
      <div className="cards">
        <div className="shadow card text-center">
          <div className="d-flex flex-column card-body">
            <div>
              <div className="card-image card-image--create"></div>
            </div>
            <h3 className="mb-3">Create Gift</h3>
            <div className="card-text card-text--explanation">
              Enter a gift amount and generate a unique gift secret.
            </div>
          </div>
        </div>
        <div className="shadow card text-center">
          <div className="d-flex flex-column card-body">
            <div>
              <div className="card-image card-image--share"></div>
            </div>
            <h3 className="mb-3">Share Gift</h3>
            <div className="card-text card-text--explanation">
              Send the gift secret to a friend or family member.
            </div>
          </div>
        </div>
        <div className="shadow card text-center">
          <div className="d-flex flex-column card-body">
            <div>
              <div className="card-image card-image--claim"></div>
            </div>
            <h3 className="mb-3">Claim Gift</h3>
            <div className="card-text card-text--explanation">
              The recipient creates a new {giftTheme.network} address and claims their gift.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
