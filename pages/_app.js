import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EasySave3 Editor</title>
        <meta property='og:site_name' content='EasySave3 Editor' />
        <meta name='keywords'
          content='EasySave3, Save file editing, Save file manipulation, Save file management, Game save editor, Save file converter, EasySave3 compatibility, Save data modification, Online save file editor, Save file backup, Save file restore, Save file extraction, Save file compression, Save file encryption, Save file decryption, Cross-platform support, EasySave3 integration, Save file analysis, Save file troubleshooting, User-friendly EasySave3 interface, Auto-save detection, Save file validation, Save file synchronization, Save file sharing, Save file recovery, Save file manipulation tools, Save file versioning'
        />

        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
