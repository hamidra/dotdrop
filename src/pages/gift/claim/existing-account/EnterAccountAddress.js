import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import { useSubstrate, utils } from '../../../../substrate-lib';
import { Formik } from 'formik';

export default function EnterAccountAddress ({
  setAddressHandler,
  prevStepHandler
}) {
  const { chainInfo, giftTheme } = useSubstrate();

  const validate = ({ address }) => {
    const errors = {};
    if (!address || !utils.validateAddress(address, chainInfo?.ss58Format)) {
      errors.address = 'Please enter a valid address';
    }
    return errors;
  };

  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'Account Address'}
          cardText={`Enter your existing ${giftTheme?.network} account address below`}
          backClickHandler={prevStepHandler}
        />
        <Formik
          initialValues={{
            address: ''
          }}
          validate={validate}
          onSubmit={(values, actions) => {
            setAddressHandler(values.address);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <>
              <Row
                style={{ height: 200 }}
                className="justify-content-center align-items-center"
              >
                <Col>
                  <Form autoComplete="off" className="w-100">
                    <Form.Group controlId="formAccountAddressGroup">
                      <Form.Label>Account Address</Form.Label>
                      <Form.Control
                        id="address"
                        name="address"
                        type="input"
                        placeholder="12YS..."
                        isInvalid={
                          props.touched?.address && props.errors?.address
                        }
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.address}
                      />
                      <Form.Text className="danger">
                        {props.touched?.address && !!props.errors?.address
                          ? props.errors?.address
                          : ''}
                      </Form.Text>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <div className="flex-grow-1" />
              <Row>
                <Col className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary"
                    disabled={props.touched?.address && !!props.errors?.address}
                    onClick={() => props.submitForm()}
                  >
                    Claim Gift
                  </button>
                </Col>
              </Row>
            </>
          )}
        </Formik>
      </Card.Body>
    </>
  );
}
