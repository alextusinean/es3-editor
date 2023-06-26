import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EasySave3 Editor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
