import { Card, Row, Col, Form } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import { Formik } from 'formik';

export default function DownloadJson ({ downloadJsonHandler, prevStepHandler }) {
  const validate = ({ accountName, password, confirmPassword }) => {
    const errors = {};
    if (!accountName) {
      errors.accountName = 'Please enter a name for your account.';
    }
    if (!password) {
      errors.password = 'Please enter a password to protect your backup file';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match.";
    }
    return errors;
  };
  return (
    <Card.Body className="d-flex flex-column">
      <CardHeader
        title={'Add JSON Backup'}
        cardText="Enter a password to protect your JSON backup file"
        backClickHandler={() => prevStepHandler()}
      />
      <Formik
        initialValues={{
          accountName: '',
          password: '',
          confirmPassword: ''
        }}
        validate={validate}
        onSubmit={({ accountName, password }, actions) => {
          downloadJsonHandler(accountName, password);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <>
            <div>
              <Row className="pt-5 flex-column">
                <Col>
                  <Form autoComplete="off" className="w-100">
                    <Form.Group>
                      <Form.Label htmlFor="accountName">
                        Account name
                      </Form.Label>
                      <Form.Control
                        id="accountName"
                        name="accountName"
                        type="input"
                        placeholder="New account"
                        isInvalid={
                          props.touched.accountName &&
                          !!props.errors.accountName
                        }
                        value={props.values.accountName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />

                      <Form.Text className="danger">
                        {props.touched.accountName && !!props.errors.accountName
                          ? props.errors.accountName
                          : ''}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <Form.Control
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        isInvalid={
                          props.touched.password && !!props.errors.password
                        }
                        value={props.values.password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />

                      <Form.Text className="danger">
                        {props.touched.password && !!props.errors.password
                          ? props.errors.password
                          : ''}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="confirmPassword">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Password"
                        isInvalid={
                          props.touched.confirmPassword &&
                          !!props.errors.confirmPassword
                        }
                        value={props.values.confirmPassword}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <Form.Text className="danger">
                        {props.touched.confirmPassword &&
                        !!props.errors.confirmPassword
                          ? props.errors.confirmPassword
                          : ''}
                      </Form.Text>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
            <div className="flex-grow-1" />
            <Col className="d-flex pt-4 justify-content-center align-items-center">
              <button
                className="btn btn-primary"
                onClick={() => !props.isSubmitting && props.submitForm()}
              >
                Download Json
              </button>
            </Col>
          </>
        )}
      </Formik>
    </Card.Body>
  );
}
