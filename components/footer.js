import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer({ left }) {
  const offset = left ? '10px' : '5px';

  return (
    <Box position='fixed' bottom={offset} left={left ? offset : undefined} right={left ? undefined : offset} textAlign={left ? 'left' : 'right'}>
      <Link as={NextLink} href='/terms-of-service' color='blue.500' mr='6.5px'>Terms of Service</Link>
      <Link as={NextLink} href='/privacy-policy' color='blue.500'>Privacy Policy</Link>
      <Text>Made with <span style={{ color: 'red' }}>♥</span> by <Link as={NextLink} href='https://alex.tusinean.ro' color='blue.500'>Alex Tușinean</Link></Text>
    </Box>
  );
}
