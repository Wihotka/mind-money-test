import { Box, Typography } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        py: '156px',
        px: '64px',
        backgroundImage: 'url(/hero.png)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Typography
        variant='h1'
        mb='24px'
        color='#FFFFFF'
        fontWeight={700}
        fontSize={40}
      >
        Start Investing in global stock markets
      </Typography>
      <Typography
        color='#FFFFFF'
        fontWeight={400}
        fontSize={16}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span>Mind.money.eu is the easiest place to invest your money and become a rich guy.</span>
        <span>Sign up and get started today free trial fo 14 days!</span>
      </Typography>
    </Box>
  );
}

export default Hero;
