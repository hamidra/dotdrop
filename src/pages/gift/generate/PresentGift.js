import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import LinkButton from '../../../components/LinkButton';
import CardHeader from '../../../components/CardHeader';
import { Link } from 'react-router-dom';
export default function PresentGift({ gift, removeGiftHandler }) {
  const { email, amount, secret } = gift;
  const mailSubject = 'Sending you some DOTs';
  const mailBody = `
  Hey! \n 
  I'm sending you ${
    amount > 1 ? `${amount} DOTs` : `${amount} DOT`
  } as a gift! You can go to \n
  https://hamidra.github.io/dotdrop/#/claim \n
  and type in the following secret message to claim your DOTs. 
  \n \n 
  ${secret} 
  \n \n 
  The website will walk you through to create your own secure
  Polkadot account. \n 
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
          cardText="Send DOTs to your friends and familiy, and have them join the
          Polkadot Network today."
        />
        <Row className="justify-content-center align-items-center my-4 mx-2">
          <Col>
            <Card className="printable border">
              <Card.Body className="p-4">
                <p>Hey!</p>
                <p>
                  I'm sending you{' '}
                  {amount > 1 ? `${amount} DOTs` : `${amount} DOT`} as a gift!
                  You can follow this link and type in the following secret
                  message to claim your DOTs.
                  <strong
                    style={{
                      backgroundColor: '#EDF1F5',
                      display: 'block',
                      textAlign: 'center',
                      padding: '5px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      borderRadius: '5px',
                    }}>
                    {secret}
                  </strong>
                  The website will walk you through to create your own secure
                  Polkadot account.
                </p>
                <p>Enjoy!</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="px-5 d-flex justify-content-end">
            <LinkButton
              className="ml-3"
              onClick={() => removeGiftHandler(secret)}>
              Delete
            </LinkButton>
            <LinkButton className="ml-3" onClick={() => printHandler()}>
              Print
            </LinkButton>
            <Button className="ml-3" onClick={() => mailToHandler()}>
              Email
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
