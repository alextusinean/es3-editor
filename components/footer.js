import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer({ left }) {
  const offset = left ? '10px' : '5px';

  return (
    <Box
      position="fixed"
      bottom={offset}
      left={left ? offset : undefined}
      right={left ? undefined : offset}
      textAlign={left ? 'left' : 'right'}
      fontSize="sm"
      color="gray.600"
    >
      <Box>
        <Link as={NextLink} href="/terms-of-service" color="blue.500" mr="6.5px">
          Terms of Service
        </Link>
        <Link as={NextLink} href="/privacy-policy" color="blue.500">
          Privacy Policy
        </Link>
      </Box>

      <Text mt={1}>
        Forked from{' '}
        <Link href="https://alex.tusinean.ro" color="blue.500" isExternal>
          Alex Tușinean&rsquo;s GitHub
        </Link>
        . Maintained by{' '}
        <Link href="https://github.com/tofted" color="blue.500" isExternal>
          Calan Marshall (tofted)
        </Link>
        .
      </Text>
    </Box>
  );
}
