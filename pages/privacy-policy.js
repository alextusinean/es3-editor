import { Box, Flex, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';

const Dbr = () => new Array(2, null).map((v, i) => <br key={i} />);

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | EasySave3 Editor</title>
        <meta property='og:title' content='Privacy Policy | EasySave3 Editor' />
        <meta property='og:url' content='https://es3.lol/privacy-policy' />
        <meta
          property='og:description'
          content='Information of our policies regarding the collection, use, and disclosure of personal information we receive from users.'
        />
        <meta
          name='description'
          content='Information of our policies regarding the collection, use, and disclosure of personal information we receive from users.'
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
Privacy Policy for <Link as={NextLink} href='/' color='blue.500'>EasySave3 Editor</Link><Dbr />

Effective date: 26 June 2023<Dbr />

Alex Tușinean (&quot;Developer&quot;) operates the EasySave3 Editor web application (&quot;Application&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal information we receive from users of the Application.<Dbr />

1. Information Collection and Use<br />
The EasySave3 Editor Web Application does not collect or store any personal information from users. The Application operates locally on the user&apos;s device, and all uploaded data and modifications remain strictly on the user&apos;s device. No data is transmitted or stored externally.<Dbr />

2. Cookies<br />
The EasySave3 Editor Web Application uses cookies for the purpose of enhancing user experience and analyzing application usage. The cookies used are limited to Google services such as Google Analytics and Google AdSense. These cookies collect non-personally identifiable information about user interactions with the Application. You may choose to disable or block cookies through your browser settings, but please note that doing so may affect certain functionality of the Application.<Dbr />

3. Data Security<br />
The EasySave3 Editor Web Application prioritizes data security and takes reasonable precautions to protect the user&apos;s uploaded data. However, please be aware that no method of transmission or electronic storage is 100% secure.<Dbr />

4. Changes to this Privacy Policy<br />
This Privacy Policy is effective as of the date stated above and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time, and you should check this Privacy Policy periodically. Your continued use of the EasySave3 Editor Web Application after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.<Dbr />

5. Contact Us<br />
If you have any questions or concerns about this Privacy Policy or the EasySave3 Editor Web Application, please contact Alex Tușinean at <Link as={NextLink} href='mailto:alex@tusinean.ro' color='blue.500'>alex@tusinean.ro</Link>.
          </Text>
        </Box>
      </Flex>
    </>
  );
}
