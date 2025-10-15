import { Box, Flex, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';

const Dbr = () => new Array(2).fill(null).map((_, i) => <br key={i} />);

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service | EasySave3 Editor</title>
        <meta property='og:title' content='Terms of Service | EasySave3 Editor' />
        <meta property='og:url' content='https://es3.lol/terms-of-service' />
        <meta
          property='og:description'
          content='The Terms of Service which govern your access to and use of EasySave3 Editor.'
        />
        <meta
          name='description'
          content='The Terms of Service which govern your access to and use of EasySave3 Editor.'
        />
      </Head>

      <Flex alignItems='center' justifyContent='center' mt='24' mb='14'>
        <Box
          direction='column'
          background='gray.700'
          rounded='6'
          p='12'
          position='relative'
          maxW='700px'
        >
          <Text whiteSpace='pre-wrap' lineHeight='1.7'>
            <strong>Terms of Service for </strong>
            <Link as={NextLink} href='/' color='blue.400'>
              EasySave3 Editor
            </Link>
            <Dbr />

            <strong>Effective date:</strong> 26 June 2023
            <Dbr />

            Please read these Terms of Service (&quot;Terms&quot;) carefully before using the EasySave3 Editor web application (&quot;Application&quot;) provided by <strong>Calan Marshall</strong> (&quot;Developer&quot;). These Terms govern your access to and use of the Application.
            <Dbr />

            <strong>1. Acceptance of Terms</strong>
            <br />
            By accessing or using the EasySave3 Editor Application, you agree to these Terms. You are free to use, modify, copy, distribute, and adapt the Application in any way you choose, for both personal and commercial purposes. If you do not agree with these Terms, you may discontinue use of the Application.
            <Dbr />

            <strong>2. License</strong>
            <Dbr
