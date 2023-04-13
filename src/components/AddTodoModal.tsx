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
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addTodo } from "../store/todosSlice";
import formateDate from "../helpers/formatDate";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  boardIndex: number;
};

const AddTodoModal: React.FC<IProps> = ({ isOpen, onClose, boardIndex }) => {
  const [todoText, setTodoText] = useState<string>("");
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();

  const onClickAddBoard = () => {
    const date = formateDate();
    dispatch(addTodo({ boardIndex, todoText, date, name }));
  };

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
                value={todoText}
                placeholder="Enter a task"
                onChange={(e) => {
                  setTodoText(e.target.value);
                }}
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
          <Button colorScheme="linkedin" onClick={onClickAddBoard}>
            Add todo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTodoModal;
