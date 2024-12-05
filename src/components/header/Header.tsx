import NextLink from 'next/link';
import { Box, Link } from '@mui/material';
import Logo from '../logo/Logo';

const Header = () => {
  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        width: '100%',
        height: '92px',
        py: '24px',
        px: '64px',
        backgroundColor: 'transparent',
      }}
    >
      <Link href='/' component={NextLink}>
        <Logo
          sx={{
            width: '238px',
            height: '44px',
            fill: 'none',
          }}
        />
      </Link>
    </Box>
  );
}

export default Header;
