import NextLink from 'next/link';
import { Box, Typography, Link } from '@mui/material';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Hero from '@/components/hero/Hero';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Header/>
        <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
          PRIVACY
        </Typography>
        <Link href='/' color='secondary' component={NextLink}>
          Go to the login page
        </Link>
        <Footer/>
      </Box>
      <Hero/>
    </Box>
  );
}
