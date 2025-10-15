import { Box, Flex, Text, Link, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service | EasySave3 Editor</title>
        <meta property="og:title" content="Terms of Service | EasySave3 Editor" />
        <meta property="og:url" content="https://es3.lol/terms-of-service" />
        <meta
          property="og:description"
          content="The Terms of Service which govern your access to and use of EasySave3 Editor."
        />
        <meta
          name="description"
          content="The Terms of Service which govern your access to and use of EasySave3 Editor."
        />
      </Head>

      <Flex alignItems="center" justifyContent="center" mt="24" mb="14">
        <Box
          direction="column"
          background="gray.700"
          rounded="6"
          p="12"
          position="relative"
          maxW="800px"
        >
          <Heading as="h1" size="lg" mb={2}>
            Terms of Service for{' '}
            <Link as={NextLink} href="/" color="blue.400">
              EasySave3 Editor
            </Link>
          </Heading>

          <Text fontSize="sm" color="gray.300" mb={6}>
            <strong>Effective date:</strong> 26 June 2023
          </Text>

          <Text mb={4}>
            Please read these Terms of Service (&quot;Terms&quot;) carefully before using the
            EasySave3 Editor web application (&quot;Application&quot;) provided by{' '}
            <strong>Calan Marshall</strong> (&quot;Developer&quot;). These Terms govern your access
            to and use of the Application.
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            1. Acceptance of Terms
          </Heading>
          <Text mb={4}>
            By accessing or using the EasySave3 Editor Application, you agree to these Terms. You
            are free to use, modify, copy, distribute, and adapt the Application in any way you
            choose, for both personal and commercial purposes. If you do not agree with these
            Terms, you may discontinue use of the Application.
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            2. License
          </Heading>
          <Text mb={2}>
            <strong>2.1. Grant of License.</strong> Calan Marshall grants you a perpetual,
            worldwide, non-exclusive, royalty-free license to use, copy, modify, merge, publish,
            distribute, sublicense, and/or sell copies of the EasySave3 Editor Application, and to
            permit others to do so, without restriction.
          </Text>
          <Text mb={4}>
            <strong>2.2. Attribution (Optional).</strong> Attribution to Calan Marshall is
            appreciated but not required when redistributing or modifying the Application.
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            3. User Responsibilities
          </Heading>
          <Text mb={2}>
            <strong>3.1. User Content.</strong> You are solely responsible for any content you
            upload or modify within the EasySave3 Editor Application. The Application functions
            locally on your device; no data or content is transmitted to any server or stored
            externally. You retain full ownership of your content.
          </Text>
          <Text mb={4}>
            <strong>3.2. Prohibited Use.</strong> You may not use the Application for illegal or
            malicious activities, such as spreading malware or engaging in unlawful acts.
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            4. Disclaimer of Warranty
          </Heading>
          <Text mb={4}>
            The EasySave3 Editor Application is provided &quot;as is&quot; and &quot;as
            available&quot;, without warranties of any kind, express or implied. Calan Marshall
            makes no guarantees that the Application will be error-free, secure, or uninterrupted.
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            5. Limitation of Liability
          </Heading>
          <Text mb={4}>
            To the maximum extent permitted by law, Calan Marshall shall not be held liable for any
            damages (including direct, indirect, incidental, or consequential) arising from your use
            or inability to use the Application.
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            6. No Affiliation with EasySave3 or Moodkie Interactive
          </Heading>
          <Text mb={4}>
            The EasySave3 Editor Application is an independent project by Calan Marshall and is not
            affiliated with EasySave3 or its developers, Moodkie Interactive, in any way. Any
            references to EasySave3 within the Application are solely for descriptive or
            compatibility purposes.
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            7. Contact Information
          </Heading>
          <Text mb={4}>
            If you have any questions or concerns regarding these Terms or the EasySave3 Editor
            Application, you can contact{' '}
            <Link href="mailto:calanmarshall@outlook.com" color="blue.400">
              calanmarshall@outlook.com
            </Link>
            .
          </Text>

          <Heading as="h2" size="md" mt={6} mb={2}>
            8. MIT License Clause
          </Heading>
          <Text whiteSpace="pre-wrap" lineHeight="1.7">
            {`Copyright © 2025 Calan Marshall

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following condition:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}
          </Text>
        </Box>
      </Flex>
    </>
  );
}
