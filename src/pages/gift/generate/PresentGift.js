import { Row, Col, Card } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate, utils } from '../../../substrate-lib';
import config from '../../../config';
import { stringHelpers } from '../../../utils';

export default function PresentGift ({ gift, removeGiftHandler }) {
  const { email, amount, secret } = gift;
  const { giftTheme, chainInfo } = useSubstrate();
  const amountStr = amount && utils.formatBalance(amount, chainInfo?.token);
  const mailSubject = `Someone has sent you ${giftTheme?.content}`;
  const claimUrl = config.CLAIM_URL;
  const formattedSecret = stringHelpers.formatGiftSecret(secret);
  const mailBody = `
  Hey! \n 
  I'm sending you ${amountStr} as a gift! You can go to \n
  ${claimUrl} \n
  and type in the following secret message to claim your ${giftTheme?.content}. 
  \n \n 
  ${formattedSecret} 
  \n \n 
  The website will walk you through to create your own secure
  ${giftTheme.network} account. \n 
  Enjoy!`;
  const mailToLink = `${email}?subject=${mailSubject}&body=${encodeURIComponent(
    mailBody
  )}`;

  const mailToHandler = () => {
    window.open(`mailto:${mailToLink}`, 'sendGiftEmail');
  };

  const printHandler = () => {
    window.print();
  };

  return (
    <>
      <Card.Body>
        <CardHeader
          title={'Send Message'}
          cardText={`Send ${giftTheme.content} to your friends and family, and have them join the
          ${giftTheme.network} Network today.`}
        />
        <Row className="justify-content-center align-items-center my-4 mx-2">
          <Col>
            <Card className="printable border">
              <Card.Body className="p-4">
                <p>Hey!</p>
                <p>
                  I'm sending you {`${amountStr}`} as a gift! You can go to</p>
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
                    and type in the following secret message to claim your{' '}
                  {`${giftTheme.content}`}.
                  <strong
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
                  {`${giftTheme.network}`} account.
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
              Delete
            </button>
            <button
              className="btn btn-link ml-3"
              onClick={() => printHandler()}>
              Print
            </button>
            <button
              className="btn btn-primary ml-3"
              onClick={() => mailToHandler()}>
              Email
            </button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
