import { Col, Row } from 'react-bootstrap';

export default function FAQ() {
  const q1 = 'What is Polkadot? What is DOT?';
  const q2 = 'How do gifts work?';
  const q3 = 'Is there a safer way to send a gift than via email?';
  const q4 = 'This sounds like a scam to me.';
  const q5 = 'What do I do if a gift does not get claimed?';
  const q6 = 'I am having trouble claiming my gift.';
  const a1 = (
    <p className="pb-3">
      Polkadot is a blockchain, that connects other blockchains. DOT is the
      utility token of Polkadot, that serves different functions in the network.
      Find out more about Polkadot&nbsp;
      <a
        href="https://polkadot.network"
        target="_blank"
        rel="noopener noreferrer">
        here
      </a>
      .
    </p>
  );
  const a2 =
    'Polkadot Gifts lets you generate a unique hash that functions as a voucher to claim an amount of DOT. Send the unique gift secret to your friend or family member. They are guided through a simple account creation process and reveal the gift secret to the Polkadot network to claim their DOTs into their account.';
  const a3 =
    'Feel free to write down the secret on a piece of paper and give it to your friend or family member in person. Once claimed, the gift secret does not hold any more value.';
  const a4 = 'We will never ask you to submit your seed phrase.';
  const a5 =
    'Try reaching out to your recipient personally. If your recipient still does not claim the gift, there is an option to revoke it and return the gift amount to your account.';
  const a6 = (
    <p className="pb-3">
      Please contact&nbsp;
      <a href="mailto:support@polkadot.network">support@polkadot.network</a>.
    </p>
  );

  return (
    <>
      <div className="py-5" style={{ maxWidth: '1040px' }}>
        <h3 className="d-flex justify-content-center pb-5 mb-3">
          Polkadot Gifts FAQ
        </h3>
        <Row>
          <Col>
            <h5>{q1}</h5>
            <>{a1}</>
            <h5>{q2}</h5>
            <p className="pb-3">{a2}</p>
            <h5>{q3}</h5>
            <p className="pb-3">{a3}</p>
          </Col>
          <Col>
            <h5>{q4}</h5>
            <p className="pb-3">{a4}</p>
            <h5>{q5}</h5>
            <p className="pb-3">{a5}</p>
            <h5>{q6}</h5>
            <>{a6}</>
          </Col>
        </Row>
      </div>
    </>
  );
}
