import { Col, Row } from 'react-bootstrap';

export default function FAQ({ giftTheme }) {
  const q1 = `What is ${giftTheme.network}? What is ${giftTheme.content}?`;
  const q2 = 'How do gifts work?';
  const q3 = 'How secure is sending a gift?';
  const q4 = 'Is there a safer way to send a gift than via email?';
  const q5 = 'This sounds like a scam to me.';
  const q6 = 'What do I do if a gift does not get claimed?';
  const q7 = 'I am having trouble claiming my gift.';
  const a1 = (
    <p className="pb-3">
      {giftTheme.network} is a scalable, interoperable & secure network protocol for the
      next web. {giftTheme.content} is the utility that serves different functions in the
      network. You can find out more about {giftTheme.network}&nbsp;
      <a
        href={giftTheme.network === 'Polkadot' ? 'https://polkadot.network' : 'https://kusama.network'}
        target="_blank"
        rel="noopener noreferrer">
        here
      </a>
      .
    </p>
  );
  const a2 =
    `${giftTheme.network} Gifts lets you generate a unique secret number that functions as a voucher to claim an amount of ${giftTheme.content}. Send the unique gift secret to your friend or family member. They are guided through a simple claim process that will ask them to reveal the gift secret to the ${giftTheme.network} network to claim their ${giftTheme.content} into their account.`;
  const a3 =
    `${giftTheme.network} Gifts is a decentralized application powered by on chain logic provided by the ${giftTheme.network} Network. The application is completely stateless and does not track any sensitive information. All interactions are done between you and the ${giftTheme.network} blockchain, keeping your account, your funds, and the gift claiming process secure.`;

  const a4 =
    'Feel free to write down the secret on a piece of paper and give it to your friend or family member in person. Once claimed, the gift secret does not hold any more value.';
  const a5 =
    `We will never ask you to submit your seed phrase, your private key, or any sensitive data. Your account and funds should be protected by your ${giftTheme.network} wallet. Just make sure to check the transactions you are signing.`;
  const a6 =
    'Try reaching out to your recipient personally. If your recipient still does not claim the gift, there is an option to revoke it and return the gift amount to your account.';
  const a7 = (
    <p className="pb-3">
      Please contact&nbsp;
      <a href={giftTheme.network === 'Polkadot' ? 'mailto:support@polkadot.network' : 'support@kusama.network'}>{giftTheme.network === 'Polkadot' ? 'support@polkadot.network' : 'support@kusama.network'}</a>.
    </p>
  );

  return (
    <>
      <div className="py-5" style={{ maxWidth: '1040px' }}>
        <h3 className="d-flex justify-content-center pb-5 mb-3">
          {giftTheme.network} Gifts FAQ
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
            <p className="pb-3">{a6}</p>
            <h5>{q7}</h5>
            <>{a7}</>
          </Col>
        </Row>
      </div>
    </>
  );
}
