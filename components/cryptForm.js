import { Button, useToast } from '@chakra-ui/react';
import { FaDownload, FaEdit } from 'react-icons/fa';
import { useRef, useState } from 'react';
import crypto from 'crypto';

export default function CryptForm({ isEncryption, isOpening, setIsOpening, password }) {
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

      {!isEncryption && (
        <Button leftIcon={<FaEdit />} colorScheme='teal' width='100%' mt='2' display='block' isDisabled>(SOON!) Open editor</Button>
      )}

      <Button
        leftIcon={<FaDownload />}
        colorScheme='teal'
        width='100%'
        mt='2'
        isLoading={isOpening}
        loadingText={`${isEncryption ? 'Encrypting' : 'Decrypting'} the save file...`}
        onClick={() => {
          if (!password || !data) {
            toast({
              title: `Failed ${isEncryption ? 'encrypting' : 'decrypting'} the save file`,
              description: !password ? 'No password provided' : 'No file chosen',
              status: 'error',
              duration: 2000,
              isClosable: true,
              position: 'bottom-left'
            });

            return;
          }

          setIsOpening(true);

          let fileName;
          let cryptedData;
          try {
            if (isEncryption) {
              fileName = 'SaveFile.encrypted.txt';

              const iv = crypto.randomBytes(16);
              const cipher = crypto.createCipheriv('aes-128-cbc', crypto.pbkdf2Sync(password, iv, 100, 16, 'sha1'), iv);
              cryptedData = Buffer.concat([iv, cipher.update(data), cipher.final()]);
            } else {
              fileName = 'SaveFile.decrypted.txt';

              const iv = data.subarray(0, 16);
              const decipher = crypto.createDecipheriv('aes-128-cbc', crypto.pbkdf2Sync(password, iv, 100, 16, 'sha1'), iv);
              cryptedData = Buffer.concat([decipher.update(data.subarray(16)), decipher.final()]);
            }
          } catch (e) {
            console.error(e);
            toast({
              title: `Failed ${isEncryption ? 'encrypting' : 'decrypting'} the save file`,
              description: isEncryption ? 'Internal error' : 'Wrong decryption password?',
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

          const blobUrl = window.URL.createObjectURL(new Blob([cryptedData], { type: 'binary/octet-stream' }));
          const downloader = document.getElementById('downloader');
          downloader.href = blobUrl;
          downloader.download = fileName;
  
          downloader.click();
          window.URL.revokeObjectURL(blobUrl);

          setIsOpening(false);
        }}
      >
        Download {isEncryption ? 'encrypted' : 'decrypted'} save file
      </Button>
    </>
  );
}
