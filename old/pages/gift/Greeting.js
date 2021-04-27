import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import OptionCard from '../../components/OptionCard';

export default function Greeting() {
  // rail manage seek lobster sad wrap symbol clever type math town cool
  // gift =>
  const history = useHistory();
  return (
    <>
      <Row className="mt-5 py-5">
        <Col className="text-center">
          <h1>There are no gifts better than some DOTs!</h1>
        </Col>
      </Row>
      <Row
        xs={1}
        md={2}
        className="mt-5 mx-auto justify-content-center align-items-center">
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center">
          <OptionCard onClick={() => history.push('/claim')}>
            <h3>Claim</h3>
            <span>your gift</span>
          </OptionCard>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center">
          <OptionCard onClick={() => history.push('/generate')}>
            <h3>Generate</h3>
            <span>a new gift</span>
          </OptionCard>
        </Col>
      </Row>
    </>
  );
}
