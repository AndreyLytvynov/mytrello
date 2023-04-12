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
import { addTodo } from "../store/boardsSlice";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  boardIndex: number;
};

const AddTodoModal: React.FC<IProps> = ({ isOpen, onClose, boardIndex }) => {
  const [todo, setTodo] = useState<string>("");
  const dispatch = useAppDispatch();

  const onClickAddBoard = () => {
    dispatch(addTodo({ boardIndex, todo }));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Todo name</FormLabel>
            <Input
              type="email"
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="linkedin" onClick={onClickAddBoard}>
            Add todo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTodoModal;
