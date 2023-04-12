import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addBoard } from "../store/boardsSlice";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddBoardModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  const [boardName, setBoardName] = useState<string>("");
  const dispatch = useAppDispatch();

  const onClickAddBoard = () => {
    dispatch(addBoard(boardName));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add board</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Board name</FormLabel>
            <Input
              type="email"
              value={boardName}
              onChange={(e) => {
                setBoardName(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="linkedin" onClick={onClickAddBoard}>
            Add board
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardModal;
