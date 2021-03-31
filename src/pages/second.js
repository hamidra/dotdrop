import {
  Box,
  Main,
  Heading,
  Text,
  Card,
  CardBody,
  CardFooter,
  Button,
} from 'grommet';
import PageHeader from '../PageHeader';
export function Second() {
  return (
    <Box align="center">
      <PageHeader />
      <Main fill align="center" pad="large">
        <Heading>Let your friend know</Heading>
        <Box width="50%">
          <Card border="all">
            <CardBody pad="medium">
              <pre>
                Hey! I'm sending you 5 dots as a gift!
                <br />
                you can go to <a href="#">here</a> to claim your gift, or go to
                <br />
                https://gift.polkadot.network,
                <br />
                and type in the following secret message to claim those DOTs.
              </pre>
            </CardBody>
          </Card>
          <Box direction="row" fill justify="evenly">
            <Button label="Print" /> <Button label="Email" />
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
