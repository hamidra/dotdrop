import { Col, Row } from 'react-bootstrap';

export default function FAQ ({ giftTheme }) {
  const q1 = `What is ${giftTheme.network}? What is ${giftTheme.content}?`;
  const q2 = 'How do gifts work?';
  const q3 = 'How can I make sure the gift I received is legit?';
  const q4 = 'What are other precautions I should take?';
  const q5 = 'What do I do if a gift does not get claimed?';
  const q6 = 'I am having trouble claiming my gift.';
  const a1 = (
    <p className="pb-3">
      {giftTheme.network} is a blockchain that connects other blockchains together into a single network,
      providing them with security and the ability to communicate with each other.&nbsp;
      {giftTheme.content} is the utility token of {giftTheme.network}, and serves different functions in the network.
      Find out more about {giftTheme.network}&nbsp;
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
    `${giftTheme.network} Gifts lets you generate a unique gift secret that functions as a voucher to claim an amount of ${giftTheme.content}. Gift givers can send the unique gift secret to a friend or family member, and they will be guided through the process of claiming the gift and setting up a ${giftTheme.network} address. The gift secret should not be shared with anyone other than the intended recipient, as anyone with access to it can claim the gift.`;
  const a3 =
    'We recommend gift givers share the gift secret either in person or via a trusted communication channel e.g. an encrypted chat app. Be wary of emails as they can be faked more easily. Once claimed, the gift secret does not hold any more value';
  const a4 =
    `Please make sure to visit ${giftTheme.network === 'Polkadot' ? 'gifts.polkadot.network' : 'gifts.kusama.network'}. Entering information on a phishing site will result in a loss of funds. The gift secret should not be shared with anyone other than the intended recipient, as anyone with access to it can claim the gift. Remember that your seed phrase allows you to recover your account and funds. We will never ask you for your seed phrase, nor should you ever share it with anyone. Anyone with access to your seed phrase has access to your ${giftTheme.content}, so be sure to keep it safe. If you lose your seed phrase and get locked out of your account, you will not be able to recover your funds`;
  const a5 =
    'Try reaching out to your recipient personally. If your recipient still does not claim the gift, there is an option to revoke it and return the gift amount to your account.';
  const a6 = (
    <p className="pb-3">
      Please visit our&nbsp;
      <a href="https://support.polkadot.network/" rel="noreferrer" target="_blank">support page</a>.
    </p>
  );

  return (
    <>
      <div className="py-5" style={{ maxWidth: '1040px' }}>
        <h3 className="d-flex justify-content-center pt-5 pb-5 mb-3">
          {giftTheme.network} Gifts FAQ
        </h3>
        <Row>
          <Col md>
            <h5>{q1}</h5>
            <>{a1}</>
            <h5>{q2}</h5>
            <p className="pb-3">{a2}</p>
            <h5>{q3}</h5>
            <p className="pb-3">{a3}</p>
          </Col>
          <Col md>
            <h5>{q4}</h5>
            <p className="pb-3">{a4}</p>
            <h5>{q5}</h5>
            <p className="pb-3">{a5}</p>
            <h5>{q6}</h5>
            <p className="pb-3">{a6}</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
