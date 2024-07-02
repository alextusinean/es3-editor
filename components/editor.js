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

export default function Editor({ isOpen, onClose }) {
  const [editorContainer, setEditorContainer] = useState(null);

  useEffect(() => {
    if (!editorContainer)
      return;

    const editor = new JSONEditor(editorContainer, {
      mode: 'tree',
      onChange: () => {
        
      }
    });

    editor.set({ phasmo: 1, money: { value: 2, currency: '$' }, 1: '2', 2: '3', 4: '5', 6: '7', 8: '9', 10: '11', 12: '13', 14: '15', 16: '17', 18: '19', 20: '21', 22: '23', 24: '25', 26: '27', 28: '29', 30: '31', 32: '33', 34: '35', 36: '37', 38: '39', 40: '41', 42: '43', 44: '45', 46: '47', 48: '49', 50: '51', 52: '53', 54: '55', 56: '57', 58: '59', 60: '61', 62: '63', 64: '65', 66: '67', 68: '69', 70: '71', 72: '73', 74: '75', 76: '77', 78: '79', 80: '81', 82: '83', 84: '85', 86: '87', 88: '89', 90: '91', 92: '93', 94: '95', 96: '97', 98: '99'});

    return () => editor.destroy();
  }, [editorContainer]);

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
          <Button colorScheme='teal'>Save</Button>
          <Button ml='3' onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
