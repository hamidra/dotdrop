import { Row, Col, Card } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate, utils } from '../../../substrate-lib';
import config from '../../../config';
import { stringHelpers } from '../../../utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function PresentGift ({ giftInfo, removeGiftHandler }) {
  const { email, name, amount, secret } = giftInfo || {};
  const { giftTheme, chainInfo } = useSubstrate();
  const amountStr = amount && utils.formatBalance(amount, chainInfo?.token);
  const mailSubject = `Someone has sent you ${giftTheme?.content}`;
  const claimUrl = config.CLAIM_URL;
  const formattedSecret = secret && stringHelpers.formatGiftSecret(secret);
  const greeting = name ? `Hey ${name?.trim()}!` : 'Hey!';
  const giftMessage =
    `${greeting}\n` +
    `I'm sending you ${amountStr} as a gift! You can go to\n\n` +
    `${claimUrl}\n\n` +
    `and type in the following gift secret to claim your ${giftTheme?.content}.\n\n` +
    `${formattedSecret}\n\n` +
    `The website will walk you through to create your own secure${giftTheme.network} account.\n` +
    'Enjoy!';

  /* const mailToLink = `${email}?subject=${mailSubject}&body=${encodeURIComponent(
    giftMessage
  )}`;

  const mailToHandler = () => {
    window.open(`mailto:${mailToLink}`, 'sendGiftEmail');
  }; */

  const printHandler = () => {
    window.print();
  };

  return (
    <>
      <Card.Body>
        <CardHeader
          title={'Send Message'}
          cardText={
            'Your gift was successfully created! Copy the following message and send it via email, or your favorite messaging app, or print it out and give it in person.'
          }
        />
        <Row className="justify-content-center align-items-center my-4 mx-2">
          <Col className="px-0">
            <Card className="printable border">
              <Card.Body className="p-4">
                <p>{greeting}</p>
                <p>I'm sending you {`${amountStr}`} as a gift! You can go to</p>
                <p>
                  <em
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '5px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      borderRadius: '5px'
                    }}>{`${claimUrl}`}</em>
                </p>
                <p>
                  and type in the following gift secret to claim your{' '}
                  {`${giftTheme.content}`}.
                  <strong
                    className="bg-gray"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '5px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      borderRadius: '5px'
                    }}>
                    {formattedSecret}
                  </strong>
                  The website will walk you through to create your own secure{' '}
                  {`${giftTheme?.network}`} account.
                </p>
                <p>Enjoy!</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="px-5 d-flex justify-content-end">
            <button
              className="btn btn-link ml-3"
              onClick={() => removeGiftHandler(secret)}>
              Remove Gift
            </button>
            <button
              className="btn btn-link ml-3"
              onClick={() => printHandler()}>
              Print
            </button>
            <CopyToClipboard text={giftMessage}>
              <button
                className="btn btn-primary ml-3"
                onClick={(e) => e.stopPropagation()}>
                Copy Message
              </button>
            </CopyToClipboard>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
