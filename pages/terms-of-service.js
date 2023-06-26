import { Box, Flex, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';

const Dbr = () => new Array(2, null).map((v, i) => <br key={i} />);

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
        >
          <Text maxWidth='500px'>
Terms of Service for <Link as={NextLink} href='/' color='blue.500'>EasySave3 Editor</Link><Dbr />

Effective date: 26 June 2023<Dbr />

Please read these Terms of Service (&quot;Terms&quot;) carefully before using the EasySave3 Editor web application (&quot;Application&quot;) provided by Alex Tușinean (&quot;Developer&quot;). These Terms govern your access to and use of the Application.<Dbr />

1.	Acceptance of Terms<br />
By accessing or using the EasySave3 Editor Application, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these Terms, you must not use the Application.<Dbr />

2. License<Dbr />

2.1. Grant of License:<br />
Subject to your compliance with these Terms, Alex Tușinean grants you a limited, non-exclusive, revocable license to access and use the EasySave3 Editor Web Application for your personal and non-commercial use.<Dbr />

3. User Responsibilities<Dbr />

3.1. User Content:<br />
You are solely responsible for the content you upload to and modify within the EasySave3 Editor Web Application. The Application allows you to upload and modify content locally on your device. No data or user content is transmitted to any servers or stored externally. You retain all ownership rights to your content.<Dbr />

3.2. Prohibited Use:<br />
You agree not to use the EasySave3 Editor Web Application for any illegal, unauthorized, or malicious purposes. The Application is intended for lawful and legitimate use.<Dbr />

4. Disclaimer of Warranty<br />
The EasySave3 Editor Web Application is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. Alex Tușinean does not warrant that the Application will be error-free or uninterrupted.<Dbr />

5. Limitation of Liability<br />
To the maximum extent permitted by law, Alex Tușinean shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with the use or inability to use the EasySave3 Editor Web Application.<Dbr />

6. No Affiliation with EasySave3 or Moodkie Interactive<br />
Please note that the EasySave3 Editor Web Application is developed by Alex Tușinean and is not affiliated with EasySave3 or its developers, Moodkie Interactive, in any way. Any references to EasySave3 within the Application are for descriptive purposes only.<Dbr />

7. Contact Information<br />
If you have any questions or concerns regarding these Terms or the EasySave3 Editor Web Application, you can contact Alex Tușinean at <Link as={NextLink} href='mailto:alex@tusinean.ro' color='blue.500'>alex@tusinean.ro</Link>.
          </Text>
        </Box>
      </Flex>
    </>
  );
}
