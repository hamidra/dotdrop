import { Box, Heading, Card, CardBody, Button, Anchor } from 'grommet';

export default function Second({
  name,
  email,
  amount,
  secret,
  removeGiftHandler,
  closeHandler,
}) {
  return (
    <Box pad="medium" align="center">
      <Heading>Let your friend know!</Heading>
      <Box align="center">
        <Card border="all" margin={{ bottom: '10px' }}>
          <CardBody pad="medium" overflow="scroll">
            <p>
              Hey {name}!
              <br />
              I'm sending you {amount} dots as a gift!
              <br />
              you can go <Anchor
                onClick={() => closeHandler()}
                label="here"
              />{' '}
              and type in the following secret message to claim your DOTs.
              <br />
              <h4>{secret}</h4>
              The website will walk you through to create your own secure
              Polkadot account
              <br />
              <br />
              Enjoy!
            </p>
          </CardBody>
        </Card>
        <Box direction="row" fill justify="evenly">
          <Button label="Print" />
          <Button label="Email" as="a" href={`mailto:${email}`} />
          <Button label="Remove" onClick={() => removeGiftHandler(secret)} />
        </Box>
      </Box>
    </Box>
  );
}
