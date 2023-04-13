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
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { changeTodo } from "../store/todosSlice";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  boardIndex: number;
  id: string;
  executor: string;
  title: string;
};

const ChangeTodoModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  boardIndex,
  id,
  title,
  executor,
}) => {
  const [textTodo, setTextTodo] = useState<string>(title);
  const [name, setName] = useState<string>(executor);
  const dispatch = useAppDispatch();

  const onChangeTodo = () => {
    if (textTodo.length === 0) return;
    dispatch(changeTodo({ boardIndex, textTodo, name, id }));
    onClose();
  };

  useEffect(() => {
    setTextTodo(title);
    setName(executor);
  }, [isOpen, title, executor]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap={"16px"} w="100%" as="form">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Textarea
                value={textTodo}
                onChange={(e) => {
                  setTextTodo(e.target.value);
                }}
                placeholder="Enter a task"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="linkedin" onClick={onChangeTodo}>
            Change todo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeTodoModal;
