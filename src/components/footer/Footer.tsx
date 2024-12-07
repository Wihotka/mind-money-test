import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        p: '64px 32px 64px 64px',
        backgroundColor: 'transparent',
      }}
    >
      <Typography
        color='primary.light'
        fontWeight={400}
        fontSize={14}
        lineHeight='20px'
      >
        © 2024 MIND MONEY LIMITED
      </Typography>
      <Typography
        color='primary.light'
        fontWeight={400}
        fontSize={14}
        lineHeight='20px'
        sx={{
          display: 'flex',
          gap: '4px',
        }}
      >
        <span>Have some issue?</span>
        <span>Wrote us <Link type='email' href={'mailto:info@mind-money.eu'} color='secondary' sx={{ textDecoration: 'none' }}>info@mind-money.eu</Link></span>
      </Typography>
    </Box>
  );
}

export default Footer;
