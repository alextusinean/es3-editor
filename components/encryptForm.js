import { Button, useToast } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
import { useRef, useState } from 'react';
import crypto from 'crypto';

export default function EncryptForm({ downloader: { current: downloader }, isOpening, setIsOpening, password }) {
  const toast = useToast();
  const saveFileRef = useRef();
  const [data, setData] = useState(null);

  return (
    <>
      <input
        type='file'
        ref={saveFileRef}
        disabled={isOpening}
        onChange={changeEvent => {
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
      <div width='100%'></div>

      <Button
        leftIcon={<FaDownload />}
        colorScheme='teal'
        width='100%'
        mt='2'
        isLoading={isOpening}
        loadingText='Encrypting the save file...'
        onClick={() => {
          if (!password) {
            toast({
              title: 'Failed encrypting the save file',
              description: 'No encryption password provided',
              status: 'error',
              duration: 2000,
              isClosable: true,
              position: 'bottom-left'
            });

            return;
          }

          if (!data) {
            toast({
              title: 'Failed encrypting the save file',
              description: 'No file chosen',
              status: 'error',
              duration: 2000,
              isClosable: true,
              position: 'bottom-left'
            });
            
            return;
          }

          setIsOpening(true);

          let encryptedData;
          try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-128-cbc', crypto.pbkdf2Sync(password, iv, 100, 16, 'sha1'), iv);
            encryptedData = Buffer.concat([iv, cipher.update(data), cipher.final()]);
          } catch (e) {
            console.error(e);
            toast({
              title: 'Failed encrypting the save file',
              description: 'Internal error',
              status: 'error',
              duration: 2500,
              isClosable: true,
              position: 'bottom-left'
            });
            
            setIsOpening(false);
            return;
          }
          
          setData(null);
          saveFileRef.current.value = '';

          const blobUrl = window.URL.createObjectURL(new Blob([encryptedData], { type: 'binary/octet-stream' }));
          downloader.href = blobUrl;
          downloader.download = 'SaveFile.encrypted.txt';
  
          downloader.click();
          window.URL.revokeObjectURL(blobUrl);

          setIsOpening(false);
        }}
      >
        Download encrypted save file
      </Button>
    </>
  );
}
