import { Row, Col } from 'react-bootstrap';
import OptionCard from '../../components/OptionCard';
export default function AccountOptions({ options }) {
  return (
    <>
      <Row
        xs={1}
        md={2}
        className="mt-5 mx-auto justify-content-center align-items-center">
        {options.map((option) => (
          <Col className="d-flex justify-content-center align-items-center">
            <OptionCard
              onClick={() => {
                option.selectHandler();
              }}>
              <h4>{option.label}</h4>
            </OptionCard>
          </Col>
        ))}
      </Row>
    </>
  );
}
