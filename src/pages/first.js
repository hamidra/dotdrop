import React, { useState, useContext } from 'react';
import {
  Box,
  Header,
  Heading,
  Form,
  Text,
  TextInput,
  Button,
  Main,
  Card,
  CardBody,
  TextArea,
  Image,
  ResponsiveContext,
} from 'grommet';

export default function First({ generateGiftHandler, claimGiftHandler }) {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const amountChangeHandler = (amount) => {
    // toDO: validate the input is valid and in the range
    setAmount(amount);
  };
  const size = React.useContext(ResponsiveContext);
  return (
    <Box align="center">
      <Main align="center" height="100%">
        <Heading level="1">Dots are Awesome!</Heading>
        <Box align="center">
          <Heading level="3" textAlign="center">
            Send some gifts to your friends and family and have them join
            polkadot network!
          </Heading>
          <Card background="light-1">
            <CardBody pad="medium" direction="row" gap="medium">
              {size != 'small' ? (
                <Card height="small" width="medium" justify="center">
                  <Image
                    src={`${process.env.PUBLIC_URL}/assets/Polkadot_Logotype_color.png`}
                    width="100%"
                  />
                </Card>
              ) : null}
              <Box width={size == 'small' ? '100%' : '60%'}>
                <Box>
                  <Text>Gift value:</Text>
                  <TextInput
                    placeholder="10"
                    value={amount}
                    onChange={(e) => {
                      amountChangeHandler(e.target.value);
                    }}
                  />
                </Box>
                <Box>
                  <Text>To who:</Text>
                  <TextInput
                    placeholder="Bob"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Button
                  primary
                  label="Generate"
                  margin={{ top: 'xsmall' }}
                  alignSelf="end"
                  onClick={() => {
                    console.log('clicked!');
                    generateGiftHandler({ amount, name, email: '' });
                  }}
                />
              </Box>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Heading level="3" textAlign="center">
            Claim your gifts that you've recieved!
          </Heading>
          <Box margin={{ bottom: '10px' }}>
            <TextArea
              fill
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </Box>
          <Button
            label="Redeem"
            size="large"
            onClick={() => claimGiftHandler(secret)}
          />
        </Box>
      </Main>
    </Box>
  );
}
