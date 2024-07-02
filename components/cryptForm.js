import {
  Box,
  Button,
  Text,
  Checkbox,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { FaDownload, FaEdit } from 'react-icons/fa';
import { useRef, useState } from 'react';
import crypto from 'crypto';

function isGzip(data) {
  return data[0] == 0x1F && data[1] == 0x8B;
}

async function pipeThrough(data, stream) {
  let piped = Buffer.from('');
  const reader = new Blob([data]).stream()
    .pipeThrough(stream)
    .getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done)
      break;

    piped = Buffer.concat([piped, value]);
  }

  return piped;
}

export default function CryptForm({ isEncryption, isLoading, setIsLoading, password }) {
  const toast = useToast();
  const saveFileRef = useRef();
  const [data, setData] = useState(null);
  const [shouldGzip, setShouldGzip] = useState(false);
  const [isEncryptionWarning, setIsEncryptionWarning] = useState(false);
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();

  const onOpen = (encryption) => {
    if (encryption)
      setIsEncryptionWarning(true);

    _onOpen();
  };

  const onClose = () => {
    _onClose();
    setIsEncryptionWarning(false);
  };

  const download = () => {
    setData(null);
    saveFileRef.current.value = '';

    const downloader = document.getElementById('downloader');
    downloader.click();
    window.URL.revokeObjectURL(downloader.href);
  };

  return (
    <>
      <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <input
          type='file'
          ref={saveFileRef}
          disabled={isLoading}
          onChange={changeEvent => {
            if (!changeEvent.target.files.length)
              return;

            const fileReader = new FileReader();
            fileReader.onload = loadEvent => setData(Buffer.from(loadEvent.target.result));
            fileReader.onerror = e => {
              console.error(e);
              toast({
                title: 'Failed processing the save file',
                description: 'Please try choosing the save file again',
                status: 'error',
                duration: 2500,
                isClosable: true,
                position: 'bottom-left'
              });
            };

            fileReader.readAsArrayBuffer(changeEvent.target.files[0]);
          }}
        />
        {isEncryption && (
          <Checkbox
            disabled={isLoading}
            isChecked={shouldGzip}
            onChange={e => {
              if (!e.target.checked)
                setShouldGzip(false);
              else
                onOpen(true);
            }}
          >
            GZip
          </Checkbox>
        )}
      </Box>
      <div width='100%'></div>

      {!isEncryption && (
        <Button leftIcon={<FaEdit />} colorScheme='teal' width='100%' mt='2' display='block' isDisabled>(SOON!) Open editor</Button>
      )}

      <Button
        leftIcon={<FaDownload />}
        colorScheme='teal'
        width='100%'
        mt='2'
        isLoading={isLoading}
        loadingText={`${isEncryption ? 'Encrypting' : 'Decrypting'} the save file...`}
        onClick={async () => {
          if (!data || (isEncryption ?  (!password && !shouldGzip) : (!password && !isGzip(data)))) {
            toast({
              title: `Failed ${isEncryption ? 'encrypting' : 'decrypting'} the save file`,
              description: !data ? 'No file chosen' : 'No password provided',
              status: 'error',
              duration: 2000,
              isClosable: true,
              position: 'bottom-left'
            });

            return;
          }

          
          setIsLoading(true);

          let fileName;
          let cryptedData = data;
          let wasGunzipped = false;
          try {
            if (isEncryption) {
              fileName = 'SaveFile.encrypted.txt';

              if (shouldGzip)
                cryptedData = await pipeThrough(cryptedData, new CompressionStream('gzip'));

              if (password) {
                const iv = crypto.randomBytes(16);
                const cipher = crypto.createCipheriv('aes-128-cbc', crypto.pbkdf2Sync(password, iv, 100, 16, 'sha1'), iv);
                cryptedData = Buffer.concat([iv, cipher.update(cryptedData), cipher.final()]);
              }
            } else {
              fileName = 'SaveFile.decrypted.txt';

              if (password) {
                const iv = cryptedData.subarray(0, 16);
                const decipher = crypto.createDecipheriv('aes-128-cbc', crypto.pbkdf2Sync(password, iv, 100, 16, 'sha1'), iv);
                cryptedData = Buffer.concat([decipher.update(cryptedData.subarray(16)), decipher.final()]);
              }

              if (isGzip(cryptedData)) {
                wasGunzipped = true;
                cryptedData = await pipeThrough(cryptedData, new DecompressionStream('gzip'));
              }
            }
          } catch (e) {
            console.error(e);
            toast({
              title: `Failed ${isEncryption ? 'encrypting' : 'decrypting'} the save file`,
              description: isEncryption ? 'Internal error' : 'Wrong decryption password? Try leaving the password field empty.',
              status: 'error',
              duration: 3500,
              isClosable: true,
              position: 'bottom-left'
            });
            
            setIsLoading(false);
            return;
          }

          const blobUrl = window.URL.createObjectURL(new Blob([cryptedData], { type: 'binary/octet-stream' }));
          const downloader = document.getElementById('downloader');
          downloader.href = blobUrl;
          downloader.download = fileName;
  
          if (wasGunzipped)
            onOpen();
          else
            download();

          setIsLoading(false);
        }}
      >
        Download {isEncryption ? 'encrypted' : 'decrypted'} save file
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen} onClose={onClose}
        scrollBehavior='inside' isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='orange'>Warning!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEncryptionWarning ? (
              <Text>
                You should only check this box if you were warned that the save file was GUnZipped too when you decrypted it.
                If you GZip a save file that isn&apos;t supposed to be GZipped, the game might not recognize it and might delete it.
              </Text>
            ) : (
              <Text>
                Your save file was also GUnZipped (decompressed). This means that when you are done editing your save file
                and want to re-encrypt it, you will have to check the GZip checkbox before so the file can also be re-compressed.
                Unless you check the box, the save file might not be recognized by the game and might be deleted.
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='teal'
              onClick={() => {
                if (isEncryptionWarning)
                  setShouldGzip(true);
                else
                  download();

                onClose();
              }}
            >
              Ok, proceed{!isEncryptionWarning ? ' with download' : ''}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
