import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import JSONEditor from 'jsoneditor';
import { useRef, useEffect, useCallback, useState } from 'react';
import 'jsoneditor/dist/jsoneditor.min.css';

import Footer from './footer';

export default function Editor({ isLoading, setIsLoading, isOpen, onClose, data, setData, saveData }) {
  const [editorContainer, setEditorContainer] = useState(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editorContainer || !data)
      return;

    const editor = new JSONEditor(editorContainer, {
      mode: isLoading ? 'view': 'tree',
      onChangeText: newData => {
        setData({ ...data, data: Buffer.from(newData) });
      }
    });

    setEditor(editor);
    editor.set(JSON.parse(data.data.toString()));

    return () => {
      setEditor(null);
      editor.destroy();
    };
  }, [editorContainer]);

  useEffect(() => {
    if (!editor)
      return;

    editor.setMode(isLoading ? 'view' : 'tree');
  }, [isLoading]);

  const editorContainerRef = useCallback(node => {
    if (node)
      setEditorContainer(node);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='full' mt='20'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editor</ModalHeader>
        <ModalBody mt='5'>
          <div ref={editorContainerRef}></div>
        </ModalBody>
        <ModalFooter>
          <Footer left />
          <Button
            colorScheme='orange'
            isDisabled={isLoading}
            onClick={async () => {
              setIsLoading(true);

              const isSaveSuccess = await saveData();
              setIsLoading(false);

              if (isSaveSuccess)
                onClose();
            }}
          >
            Save
          </Button>
          <Button
            ml='3'
            onClick={() => {
              setData(null);
              onClose();
            }}
            isDisabled={isLoading}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
