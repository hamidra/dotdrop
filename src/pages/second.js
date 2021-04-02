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

export default function Second({
  name,
  email,
  amount,
  secret,
  removeGiftHandler,
}) {
  return (
    <Box align="center">
      <Main fill align="center" pad="large">
        <Heading>Let your friend know</Heading>
        <Box align="center">
          <Card border="all" margin={{ bottom: '10px' }}>
            <CardBody pad="medium">
              <pre>
                Hey {name}!
                <br />
                I'm sending you {amount} dots as a gift!
                <br />
                you can go to <a href="#">here</a> to claim your gift, and type
                in the following secret message to claim those DOTs.
                <br />
                <h4>{secret}</h4>
              </pre>
            </CardBody>
          </Card>
          <Box direction="row" fill justify="evenly">
            <Button label="Print" />
            <Button label="Email" as="a" href={`mailto:${email}`} />
            <Button label="Remove" onClick={() => removeGiftHandler(secret)} />
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
