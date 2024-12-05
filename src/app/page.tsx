import NextLink from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Home() {
  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in TypeScript
        </Typography>
        <Link href='/about' color='secondary' component={NextLink}>
          Go to the about page
        </Link>
      </Box>
      <Box>
        <Typography variant='body1'>
          This is a simple example of a Material UI app using Next.js and the
          AppRouterCacheProvider. It includes a simple home page and an about page.
        </Typography>
      </Box>
    </Container>
  );
}
