import { Box, Code, Divider, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import DecryptionForm from '../components/decryptionForm';
import EncryptionForm from '../components/encryptionForm';
import Head from 'next/head';

export default function Home() {
  const downloader = useRef();
  const [isOpening, setIsOpening] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <>
      <Head>
        <title>EasySave3 Editor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
          <Text mb={6}>Use <Code>t36gref9u84y7f43g</Code> for Phasmophobia</Text>

          <Divider mt='5' mb='3' />
          <Heading size='md' mb='3'>Decryption</Heading>
          <DecryptionForm downloader={downloader} isOpening={isOpening} setIsOpening={setIsOpening} password={password} />

          <Divider mt='5' mb='3' />
          <Heading size='md' mb='3'>Encryption</Heading>
          <EncryptionForm downloader={downloader} isOpening={isOpening} setIsOpening={setIsOpening} password={password} />
        </Box>
      </Flex>
    </>
  );
}
