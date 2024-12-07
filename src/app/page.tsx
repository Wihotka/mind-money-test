import { Box } from '@mui/material';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Form from '@/components/form/Form';
import Hero from '@/components/hero/Hero';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Header/>
        <Box
          mt='64px'
          mb='auto'
        >
          <Form/>
        </Box>
        <Footer/>
      </Box>
      <Hero/>
    </Box>
  );
}
