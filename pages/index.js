import {
  Box,
  Code,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Link,
  useToast
} from '@chakra-ui/react';
import { CloseIcon, ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import CryptForm from '../components/cryptForm';
import Footer from '../components/footer';
import passwords from '../passwords';

const PASSWORD_LENGTH_THRESHOLD = 50;

function PasswordView({ toast, gameName, password, myIndex, selectedIndex, setSelectedIndex }) {
  const selected = myIndex == selectedIndex;
  const passesThreshold = password.length > PASSWORD_LENGTH_THRESHOLD;

  return (
    <>
      <IconButton
        visibility={passesThreshold ? 'visible' : 'hidden'}
        size='sm' mr='2' variant='ghost' rounded='full'
        icon={selected ? <ChevronRightIcon /> : <ChevronDownIcon />}
        onClick={() => setSelectedIndex(selected ? -1 : myIndex)}
      />
      <Code
        display={!selected ? 'none' : undefined}
        maxW='50%'
        whiteSpace='normal'
        overflowWrap='break-word'
        wordBreak='break-word'
      >
        {password}
      </Code>
      <Code display={selected ? 'none' : undefined}>
        {password.slice(0, 25)}
      </Code>
      {!selected && passesThreshold ? (
        <>
          <Text>...</Text>
          <Box ml='2'>
            <Link
              onClick={() => {
                navigator.clipboard.writeText(password);
                toast({
                  title: 'Successfully copied',
                  description: `The password for ${gameName} was copied to clipboard!`,
                  status: 'success',
                  duration: 1500,
                  isClosable: true,
                  position: 'bottom-left'
                });
              }} color='skyblue'
            >
              <Text fontSize='x-small'>unusually long password</Text>
              <Text fontSize='small'>click to copy</Text>
            </Link>
          </Box>
        </>
      ) : false}
    </>
  );
}

export default function Home() {
  const toast = useToast();
  const [passwordIndex, setPasswordIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <a id='downloader' style={{ display: 'none' }}></a>
      <Flex alignItems='center' justifyContent='center' mt='24' mb='14'>
        <Box
          direction='column'
          background='gray.700'
          rounded='6'
          p='12'
          position='relative'
        >
          <Heading mb='6'>EasySave3 Editor</Heading>

          <Text>Password</Text>
          <Box display='flex' flexDirection='row'>
            <Input
              value={password}
              placeholder='a1bc2d3fghi4...'
              onChange={e => {
                if (typeof gtag != 'undefined')
                  gtag('event', 'change_password', { password: e.target.value });

                setPassword(e.target.value);
              }}
              disabled={isLoading}
            />
            <IconButton
              ml='3'
              variant='outline'
              colorScheme='red'
              icon={<CloseIcon />}
              onClick={() => {
                if (typeof gtag != 'undefined')
                  gtag('event', 'clear_password', { 'previous_password': password });

                setPassword('');
              }}
            />
          </Box>
          <Text mt='2'>Don&apos;t know the password for your game?</Text>
          <Text>Check if it is already known below.</Text>
          <Button
            mt='2' colorScheme='teal'
            onClick={() => {
              if (typeof gtag != 'undefined')
                gtag('event', 'open_known_passwords', { password });

              onOpen();
            }}
          >
            Known game passwords
          </Button>

          <Divider mt='8' mb='3' />
          <Heading size='md' mb='3'>Decryption</Heading>
          <CryptForm isLoading={isLoading} setIsLoading={setIsLoading} password={password} />
          <Text mt='5'>Some games might not encrypt their save files and</Text>
          <Text>only compress them using GZip. In this case, you</Text>
          <Text>don&apos;t have to provide a password.</Text>

          <Divider mt='5' mb='3' />
          <Heading size='md' mb='3'>Encryption</Heading>
          <CryptForm isLoading={isLoading} setIsLoading={setIsLoading} password={password} isEncryption />
        </Box>
      </Flex>

      <Footer />

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen} onClose={onClose}
        scrollBehavior='inside' isCentered
        size='3xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Known game passwords</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {passwords.map(({ gameName, password }, index) => (
              <Box key={index}>
                {index !== 0 && <Divider my='2' />}
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                >
                  <PasswordView
                    toast={toast} gameName={gameName}
                    password={password} myIndex={index}
                    selectedIndex={passwordIndex}
                    setSelectedIndex={setPasswordIndex}
                  />
                  <Text ml='auto'>{gameName}</Text>
                  <Button
                    ml='3' colorScheme='teal'
                    onClick={() => {
                      if (typeof gtag != 'undefined')
                        gtag('event', 'use_password', { 'game_name': gameName, password });

                      setPassword(password);
                      onClose();
                    }}
                  >
                    Use
                  </Button>
                </Box>
              </Box>
            ))}
            <Text mt='5'>Can&apos;t find your game here?</Text>
            <Text>Try decrypting it without a password.</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
