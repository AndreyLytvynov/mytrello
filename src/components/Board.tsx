import React from "react";
import TodoItem from "./TodoItem";
import {
  Box,
  Button,
  Heading,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import AddTodoModal from "./AddTodoModal";

interface ITodoItem {
  id: string;
  title: string;
}

interface IBoardProps {
  todoList: ITodoItem[];
  titleBoard: string;
  boardIndex: number;
}

const Board: React.FC<IBoardProps> = ({ titleBoard, todoList, boardIndex }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w={"200px"}
      p={"10px"}
      backgroundColor={"gray.100"}
      borderTopRadius={"10px"}
    >
      <Heading size="md" textAlign={"center"}>
        {titleBoard}
      </Heading>
      <Droppable droppableId={String(boardIndex)}>
        {(provided: DroppableProvided) => (
          <>
            <UnorderedList
              m={"0"}
              mt={"10px"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todoList.map((todo, index) => {
                return (
                  <TodoItem
                    key={todo.id}
                    index={index}
                    id={todo.id}
                    title={todo.title}
                  />
                );
              })}
              {provided.placeholder}
            </UnorderedList>
          </>
        )}
      </Droppable>
      <Button colorScheme="facebook" onClick={onOpen}>
        Add todo
      </Button>
      <AddTodoModal isOpen={isOpen} onClose={onClose} boardIndex={boardIndex} />
    </Box>
  );
};

export default Board;
