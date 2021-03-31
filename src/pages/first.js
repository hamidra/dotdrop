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
import PageHeader from '../PageHeader';

export default function First() {
  return (
    <Box align="center">
      <PageHeader />
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
              <TextInput placeholder="type here" />
            </Box>
            <Box>
              <Text>To who:</Text>
              <TextInput placeholder="type here" />
            </Box>
            <Button
              primary
              label="Generate"
              margin={{ top: 'xsmall' }}
              alignSelf="end"
            />
          </Box>
        </Form>
      </Main>
    </Box>
  );
}
