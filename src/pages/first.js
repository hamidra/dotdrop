import React, { useState } from 'react';
import {
  Box,
  Header,
  Heading,
  Form,
  Text,
  TextInput,
  Button,
  Main,
} from 'grommet';

export default function First({ generateGiftHandler }) {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const amountChangeHandler = (amount) => {
    // toDO: validate the input is valid and in the range
    setAmount(amount);
  };
  return (
    <Box align="center">
      <Main align="center" pad="large">
        <Heading level="1">Dots are Awesome!</Heading>
        <Heading level="3" textAlign="center">
          send some gifts to your friends and family and have them join polkadot
          network!
        </Heading>
        <Form>
          <Box>
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
        </Form>
      </Main>
    </Box>
  );
}
