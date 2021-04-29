import { Row, Col, Form, Card } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import Button from '../../../../components/CustomButton';

export default function CreateNewAccount({
  mnemonicWords,
  nextStepHandler,
  prevStepHandler,
}) {
  const label = 'I have stored my seed phrase in a safe place.';

  return (
    <>
      <Card.Body>
        <CardHeader
          title={'Account Seed Phrase'}
          backClickHandler={() => prevStepHandler()}
        />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              <span className="d-block">
                Write down the following words in order and store them somewhere
                safe. This seed phrase allows you to recover your account and
                funds.
              </span>
            </p>
          </Col>
        </Row>
        <Row className="p-3 justify-content-center align-items-center">
          <Row className="p-5">
            {mnemonicWords.map((word, index) => (
              <Col md={4}>
                <div className="border-bottom border-dark">{`${word}`}</div>
              </Col>
            ))}
          </Row>
          <div className="w-100" />
          <Col>
            <Form.Check type="checkbox" label={label} />
          </Col>
          <div className="w-100" />
          <Col className="mt-3 d-flex justify-content-end">
            <Button onClick={() => nextStepHandler()}>Next</Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
