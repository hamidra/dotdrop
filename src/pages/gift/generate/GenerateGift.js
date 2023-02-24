import { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { GenerateContext } from './GenerateMain';
import { useSubstrate, utils } from '../../../substrate-lib';
import { Formik } from 'formik';
import config from '../../../config';
import BN from 'bn.js';
import analytics from '../../../analytics';

export default function GenerateGift({
  account,
  initialGiftInfo,
  setGiftInfoHandler,
  // this can be 1 or more and specifies the number of tx's a gift sender covers the fees for.
  // (at least 1 to conver 1 tx from interim gift account to the recipient account).
  giftFeeMultiplier,
}) {
  const { api, apiState, chainInfo, giftTheme } = useSubstrate();

  const { prevStep } = useContext(GenerateContext);

  const [balance, setBalance] = useState(null);
  const [txFee, setTxFee] = useState(null);
  const [amountWarning, setAmountWarning] = useState(null);

  const balanceDecimalPoints = 5;
  const balanceVal = balance?.free
    ? utils.fromChainUnit(
        utils.getUsableBalances(balance),
        chainInfo?.decimals,
        balanceDecimalPoints
      )
    : null;
  const balanceStr =
    balanceVal && utils.formatBalance(balanceVal, chainInfo?.token);

  useEffect(() => {
    let unsub;
    setBalance(null);
    account?.address &&
      api?.query?.system &&
      api.query.system
        .account(account.address, (accountInfo) => {
          const balance = accountInfo?.data;
          setBalance(balance);
          console.log(
            `free balance is ${balance?.free} with ${balance?.miscFrozen} frozen and ${balance?.reserved} reserved and a nonce of ${accountInfo?.nonce}`
          );
        })
        .then((result) => {
          unsub = result;
        })
        .catch((error) => {
          console.log(error);
        });

    return () => unsub && unsub();
  }, [api, apiState, account, chainInfo]);

  useEffect(() => {
    // since the txFees does not differ much for different amounts,
    // to be safe and efficient we just calculate the maximum possible txFee for the whole available balance of the account
    async function fetchTxFee() {
      try {
        const address = account?.address;
        if (address) {
          const transferTx = api.tx.balances.transfer(
            address,
            utils.getUsableBalances(balance) || 0
          );
          const remarkTx = api.tx.system.remarkWithEvent('gift::create');
          const txs = [transferTx, remarkTx];
          const info = await api.tx.utility.batchAll(txs).paymentInfo(address);
          const estimatedFee = utils.calcFeeAdjustments(info.partialFee);
          setTxFee(estimatedFee);
        }
      } catch (err) {
        console.log(`error while loading tx fees: ${err}`);
      }
    }
    fetchTxFee();
  }, [api, apiState, account, chainInfo, balance]);

  const checkAmountWarning = (amount) => {
    const amountFloat = !isNaN(amount) && parseFloat(amount);

    const maxAmount = config?.MAX_AMOUNT?.toString();
    const maxAmountFloat = !isNaN(maxAmount) && parseFloat(maxAmount);
    const maxAmountStr =
      maxAmountFloat && utils.formatBalance(maxAmount, chainInfo?.token);
    const isTooHigh =
      amountFloat && maxAmountFloat && amountFloat > maxAmountFloat;
    if (isTooHigh) {
      setAmountWarning(
        `This looks like a large amount for a gift. We recommend direct account transactions for gifts larger than ${maxAmountStr}.`
      );
    } else {
      setAmountWarning(null);
    }
  };

  const validateGiftAmount = (amount) => {
    const giftChainAmount = utils.toChainUnit(amount, chainInfo.decimals);
    // calculated as one txfee for the tx from sender account to interim account,
    // plus the number of future tx fees (specified by giftFeeMultiplier) that the sender will cover,
    // which is at least 1 to conver 1 tx from interim gift account to the recipient account.

    const totalTxFees = new BN(txFee || 0, 10).muln(giftFeeMultiplier + 1);
    // this is the amount that will be deducted from sender account
    const totalChainAmount = giftChainAmount?.add(totalTxFees);
    // validate gift amount
    if (!amount) {
      return 'Please enter the gift amount.';
    }
    if (giftChainAmount) {
      // check if the gift amount is above existential deposit
      const minChainGiftAmount = chainInfo?.existentialDeposit || 0;
      if (giftChainAmount.lt(minChainGiftAmount)) {
        const minGiftAmount = utils.fromChainUnit(
          minChainGiftAmount,
          chainInfo.decimals
        );
        const minGiftAmountError = `The amount is below ${minGiftAmount} ${chainInfo?.token}, the existential deposit for the ${chainInfo?.chainName} network.`;
        return minGiftAmountError;
      }
    }
    if (totalChainAmount && balance) {
      // check if the account has enough funds to pay the gift amount and fees
      const minRequiredBalance = totalChainAmount;
      if (utils.getUsableBalances(balance)?.lt(minRequiredBalance)) {
        const freeBalance = utils.fromChainUnit(
          utils.getUsableBalances(balance),
          chainInfo.decimals,
          balanceDecimalPoints
        );
        const fees = utils.fromChainUnit(
          totalTxFees,
          chainInfo.decimals,
          balanceDecimalPoints
        );
        const minAvailableBalanceError = `The account balance of ${freeBalance} ${chainInfo.token} is not enough to pay the gift amount of ${amount} ${chainInfo.token} plus fees of (${fees} ${chainInfo.token})`;
        return minAvailableBalanceError;
      }
      // check if the account balance - gift_amount is hight then the existential deposit so the gift won't kill the account.
      const remainingBalance = utils
        .getUsableBalances(balance)
        ?.sub(totalChainAmount);
      const edAmount =
        utils.fromChainUnit(
          chainInfo?.existentialDeposit,
          chainInfo?.decimals
        ) || 0;
      if (remainingBalance.lt(chainInfo?.existentialDeposit || 0)) {
        const keepAliveError = `The gift amount of ${amount} ${chainInfo.token} will bring your account balance below ${edAmount} ${chainInfo.token} (existential deposit for the ${chainInfo?.chainName} network). This will kill your account and make you lose the remaining funds.`;
        return keepAliveError;
      }
    }
    checkAmountWarning(amount);
  };

  const validate = ({ recipientName, amount }) => {
    const errors = {};
    const maxNameLength = 50;
    if (recipientName && recipientName.length > maxNameLength) {
      errors.recipientName = `Recipient name can not be more than ${maxNameLength} characters`;
    }
    const amountError = validateGiftAmount(amount);
    if (amountError) {
      errors.amount = amountError;
    }
    return errors;
  };

  const _setAmount = (value, formik) => {
    const pattern = /^([0-9]+\.?[0-9]*)?$/i;
    const amount = pattern.test(value) ? value : formik.values.amount;
    formik.setFieldValue('amount', amount);
  };

  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title="Gift Details"
          cardText={`Enter the recipient’s name and the amount of ${giftTheme?.content} you would like to send.`}
          backClickHandler={() => prevStep()}
        />
        <Formik
          initialValues={{
            amount: initialGiftInfo?.amount || '',
            recipientName: initialGiftInfo?.name || '',
          }}
          validate={validate}
          onSubmit={({ recipientName, amount }, actions) => {
            const totalGiftFee = new BN(txFee || 0, 10).muln(giftFeeMultiplier);
            const fee = utils.fromChainUnit(
              totalGiftFee,
              chainInfo.decimals,
              balanceDecimalPoints
            );

            setGiftInfoHandler({
              recipientName,
              amount,
              fee,
            });
          }}
        >
          {(props) => (
            <>
              <Row className="flex-column align-items-center">
                <Col className="d-flex justify-content-center align-items-center pt-4">
                  <Form autoComplete="off" className="w-100">
                    <Form.Group>
                      <Form.Label htmlFor="recipientName">
                        Recipient Name
                      </Form.Label>
                      <Form.Control
                        id="recipientName"
                        name="recipientName"
                        type="text"
                        autoComplete="off"
                        placeholder=""
                        value={props.values.recipientName}
                        isInvalid={
                          props.touched.recipientName &&
                          !!props.errors.recipientName
                        }
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <Form.Text className="danger">
                        {props.touched.recipientName &&
                        !!props.errors.recipientName
                          ? props.errors.recipientName
                          : ''}
                      </Form.Text>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label htmlFor="amount">Amount</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          id="amount"
                          name="amount"
                          type="text"
                          autoComplete="off"
                          placeholder=""
                          className={`${
                            props.touched.amount &&
                            !!props.errors.amount &&
                            'input-danger'
                          } ${amountWarning && 'input-warning'}`}
                          value={props.values.amount}
                          onChange={(e) => {
                            _setAmount(e.target.value, props);
                          }}
                          onBlur={props.handleBlur}
                        />
                        <div className="bg-transparent balance-text balance-text--available text-wrap position-absolute">
                          {balanceStr
                            ? `${balanceStr} available`
                            : `${chainInfo?.token}`}
                        </div>
                      </div>

                      {props.touched.amount && !!props.errors.amount ? (
                        <Form.Text className="danger">
                          {props?.errors?.amount}
                        </Form.Text>
                      ) : (
                        amountWarning && (
                          <Form.Text className="warning">
                            {amountWarning}
                          </Form.Text>
                        )
                      )}
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <div className="d-flex flex-grow-1" />
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  disabled={
                    props?.touched?.recipientName &&
                    props?.touched?.amount &&
                    !props?.isValid
                  }
                  onClick={() => {
                    analytics.track('generate_form_filled');
                    props.submitForm();
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </Formik>
      </Card.Body>
    </>
  );
}
