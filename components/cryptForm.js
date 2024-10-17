import {
  Box,
  Button,
  Text,
  Link,
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
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import crypto from 'crypto';

const Editor = dynamic(() => import('./editor'), { ssr: false });

function isGzip(data) {
  return data[0] == 0x1F && data[1] == 0x8B;
}

function getJSONParseError(data) {
  try {
    JSON.parse(data.toString());
  } catch (e) {
    return e;
  }

  return null;
}

function isJSON(data) {
  try {
    JSON.parse(data.toString());
  } catch (e) {
    return false;
  }
  return true;
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

async function cryptData(data, password, isEncryption, shouldGzip) {
  let wasGunzipped = false;
  if (isEncryption) {
    if (shouldGzip)
      data = await pipeThrough(data, new CompressionStream('gzip'));

    if (password) {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-128-cbc', crypto.pbkdf2Sync(password, iv, 100, 16, 'sha1'), iv);
      data = Buffer.concat([iv, cipher.update(data), cipher.final()]);
    }
  } else {
    if (password) {
      const iv = data.subarray(0, 16);
      const decipher = crypto.createDecipheriv('aes-128-cbc', crypto.pbkdf2Sync(password, iv, 100, 16, 'sha1'), iv);
      data = Buffer.concat([decipher.update(data.subarray(16)), decipher.final()]);
    }

    if (isGzip(data)) {
      wasGunzipped = true;
      data = await pipeThrough(data, new DecompressionStream('gzip'));
    }
  }

  return { wasGunzipped, cryptedData: data };
}

export default function CryptForm({ isEncryption, isLoading, setIsLoading, password }) {
  const toast = useToast();
  const saveFileRef = useRef();
  const [data, setData] = useState(null);
  const [editorData, setEditorData] = useState(null);
  const [shouldGzip, setShouldGzip] = useState(false);
  const [lastFileName, setLastFileName] = useState(null);
  const [isEncryptionWarning, setIsEncryptionWarning] = useState(false);
  const { isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure();
  const { isOpen: isEditorOpen, onOpen: onEditorOpen, onClose: onEditorClose } = useDisclosure();

  const onOpen = (encryption) => {
    if (encryption)
      setIsEncryptionWarning(true);

    _onOpen();
  };

  const onClose = () => {
    _onClose();
    setIsEncryptionWarning(false);
  };

  const setDownloadData = (data, fileName) => {
    const blobUrl = window.URL.createObjectURL(new Blob([data], { type: 'binary/octet-stream' }));
    const downloader = document.getElementById('downloader');
    downloader.href = blobUrl;
    downloader.download = fileName;
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
            const files = changeEvent.target.files;
            if (typeof gtag != 'undefined')
              gtag('event', 'pick_file', { 'file_name': files[0] ? files[0].name : '', 'is_encryption': isEncryption, 'should_gzip': shouldGzip });

            if (!files.length) {
              setData(null);
              return;
            }

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

            const file = files[0];
            setLastFileName(file.name);
            fileReader.readAsArrayBuffer(file);
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
        <Button
          leftIcon={<FaEdit />}
          colorScheme='orange'
          width='100%' mt='2'
          display='block'
          onClick={async () => {
            if (typeof gtag != 'undefined')
              gtag('event', 'editor_open');
            
            if (!data || (!password && !isGzip(data) && !isJSON(data))) {
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

            let decryptedData;
            try {
              decryptedData = await cryptData(data, password, false);
            } catch (e) {
              console.error(e);
              toast({
                title: 'Failed decrypting the save file',
                description: 'Wrong decryption password? Try leaving the password field empty.',
                status: 'error',
                duration: 3500,
                isClosable: true,
                position: 'bottom-left'
              });
              
              setIsLoading(false);
              return;
            }

            if (!isJSON(decryptedData.cryptedData)) {
              if (typeof gtag != 'undefined')
                gtag('event', 'editor_malformed_data', {
                  'decrypted_data': decryptedData.cryptedData.toString().slice(0, 75),
                  'parse_error': getJSONParseError(decryptedData.cryptedData).message
                });

              toast({
                title: 'Can\'t open editor',
                description: (
                  <>
                    <Text>The save file isn&apos;t JSON formatted.</Text>
                    <Text>Download the file and edit it manually.</Text>
                  </>
                ),
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
              });
              
              setIsLoading(false);
              return;
            }

            setEditorData({ wasGunzipped: decryptedData.wasGunzipped, data: decryptedData.cryptedData });
            onEditorOpen();
            setIsLoading(false);
          }}
        >
          EXPERIMENTAL! Open editor
        </Button>
      )}

      <Button
        leftIcon={<FaDownload />}
        colorScheme='teal'
        width='100%'
        mt='2'
        isLoading={isLoading}
        loadingText={`${isEncryption ? 'Encrypting' : 'Decrypting'} the save file...`}
        onClick={async () => {
          if (typeof gtag != 'undefined')
            gtag('event', 'download_file', { 'is_encryption': isEncryption, 'should_gzip': shouldGzip });

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

          let fileName = isEncryption ? 'SaveFile.encrypted.txt' : 'SaveFile.decrypted.txt';
          let wasGunzipped = false;
          let cryptedData;
          try {
            let result = await cryptData(data, password, isEncryption, shouldGzip);
            wasGunzipped = result.wasGunzipped;
            cryptedData = result.cryptedData;
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

          setDownloadData(cryptedData, fileName);
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

      {!isEncryption && (
        <Editor
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isOpen={isEditorOpen}
          onClose={onEditorClose}
          data={editorData}
          setData={setEditorData}
          saveData={async () => {
            if (typeof gtag != 'undefined')
              gtag('event', 'editor_save');

            let cryptedData;
            try {
              let result = await cryptData(editorData.data, password, true, editorData.wasGunzipped);
              cryptedData = result.cryptedData;
            } catch (e) {
              console.error(e);
              toast({
                title: `Failed encrypting the edited save file`,
                description: 'Internal error',
                status: 'error',
                duration: 3500,
                isClosable: true,
                position: 'bottom-left'
              });

              return false;
            }

            setDownloadData(cryptedData, lastFileName);
            download();
            return true;
          }}
        />
      )}
    </>
  );
}
