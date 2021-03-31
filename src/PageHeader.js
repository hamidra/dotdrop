import { Header, Box, Avatar } from 'grommet';
import { UserFemale } from 'grommet-icons';
import AccountSelector from './Accounts';

export default function PageHeader() {
  return (
    <Header>
      <Box>Polkadot</Box>
      <Box direction="row">
        <Avatar background="brand">
          <UserFemale />
        </Avatar>
        <AccountSelector />
      </Box>
    </Header>
  );
}
