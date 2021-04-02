import { Header, Box, Avatar, Image } from 'grommet';
import { UserAdmin } from 'grommet-icons';
import AccountSelector from './Accounts';

export default function PageHeader({ loginHandler }) {
  return (
    <Header>
      <Box height="5rem" width="5rem">
        <Image
          src={`${process.env.PUBLIC_URL}/assets/Polkadot_symbol_color.png`}
        />
      </Box>
      <Box direction="row" gap="small">
        <Avatar background="brand">
          <UserAdmin />
        </Avatar>
        <AccountSelector setAccountAddress={loginHandler} />
      </Box>
    </Header>
  );
}
