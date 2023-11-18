import { Box, Code, Divider, Flex, Heading, Input, Text, Link } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';

import DecryptionForm from '../components/decryptionForm';
import EncryptionForm from '../components/encryptionForm';

export default function Home() {
  const downloader = useRef();
  const [isOpening, setIsOpening] = useState(false);
  const [password, setPassword] = useState('');
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <Head>
        <meta property='og:title' content={'EasySave3 Editor | Modify your favorite games\' save files!'} />
        <meta property='og:url' content='https://es3.lol/' />
        <meta
          name='og:description'
          content='EasySave3 Editor helps you empower your gaming journey with effortless save file editing. Seamlessly modify, and manage EasySave3 game saves with a user-friendly web application designed to enhance your gaming experience.'
        />
        <meta
          name='description'
          content='EasySave3 Editor helps you empower your gaming journey with effortless save file editing. Seamlessly modify, and manage EasySave3 game saves with a user-friendly web application designed to enhance your gaming experience.'
        />
      </Head>

      {currentYear && (
        <>
          <Flex alignItems='center' justifyContent='center' mt='24' mb='14'>
            <a ref={downloader} id={'downloader'} style={{ display: 'none' }}></a>
            <Box
              direction='column'
              background='gray.700'
              rounded='6'
              p='12'
              position='relative'
            >
              <Heading mb='6'>EasySave3 Editor</Heading>

              <Text>Password</Text>
              <Input value={password} placeholder='a1bc2d3fghi4...' onChange={e => setPassword(e.target.value)} isDisabled={isOpening} isRequired />
              <Text>Use <Code>t36gref9u84y7f43g</Code> for Phasmophobia</Text>
              <Text>Use <Code>lcslime14a5</Code> for Lethal Company</Text>
              <Text>Use <Code>6tr cr$#@%T#GFTVn</Code> for Strike Force Heroes</Text>
              <Text mb={6}>Use <Code>browar23</Code> for Brewpub Simulator</Text>

              <Divider mt='5' mb='3' />
              <Heading size='md' mb='3'>Decryption</Heading>
              <DecryptionForm downloader={downloader} isOpening={isOpening} setIsOpening={setIsOpening} password={password} />
              <Text mt='5'>If you are getting no errors after pressing the button</Text>
              <Text>and the decrypted file starts downloading, it means that the</Text>
              <Text>decryption was successful. For some games, the decrypted</Text>
              <Text>save file might look like it&apos;s still encrypted, but</Text>
              <Text>it can actually just be GZip compression. So, if your</Text>
              <Text>decrypted file still looks like it&apos;s encrypted, please</Text>
              <Text>try decompressing it with GZip.</Text>

              <Divider mt='5' mb='3' />
              <Heading size='md' mb='3'>Encryption</Heading>
              <EncryptionForm downloader={downloader} isOpening={isOpening} setIsOpening={setIsOpening} password={password} />
              <Text mt='5'>If you had to decompress the save file after decryption,</Text>
              <Text>you will have to recompress it again before uploading it here</Text>
              <Text>and encrypt it again.</Text>
            </Box>
          </Flex>

          <Box position='fixed' bottom='5px' right='5px' textAlign='right'>
            <Link as={NextLink} href='/terms-of-service' color='blue.500' mr='6.5px'>Terms of Service</Link>
            <Link as={NextLink} href='/privacy-policy' color='blue.500'>Privacy Policy</Link>
            <Text>Copyright © {currentYear} <Link as={NextLink} href='https://alex.tusinean.ro' color='blue.500'>Alex Tușinean</Link></Text>
          </Box>
        </>
      )}
    </>
  );
}
