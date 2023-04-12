import React from "react";
import TodoItem from "./TodoItem";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import AddTodoModal from "./AddTodoModal";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteBoard } from "../store/boardsSlice";
import { useAppDispatch } from "../hooks/redux";

interface ITodoItem {
  id: string;
  title: string;
  date: string;
  name: string;
}

interface IBoardProps {
  todoList: ITodoItem[];
  titleBoard: string;
  boardIndex: number;
}

const Board: React.FC<IBoardProps> = ({ titleBoard, todoList, boardIndex }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const onDeleteBoard = () => {
    dispatch(deleteBoard(boardIndex));
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      minH={"100px"}
      w={"250px"}
      p={"10px"}
      backgroundColor={"gray.100"}
      borderTopRadius={"10px"}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading size="md" textAlign={"center"}>
          {titleBoard}
        </Heading>
        <IconButton
          onClick={onDeleteBoard}
          variant="outline"
          colorScheme="teal"
          aria-label="delete board"
          icon={<DeleteIcon fontSize="20px" _hover={{ color: "teal.500" }} />}
          h={0}
          minW={0}
          border={"none"}
        />
      </Flex>

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
                    boardIndex={boardIndex}
                    index={index}
                    id={todo.id}
                    title={todo.title}
                    date={todo.date}
                    name={todo.name}
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
    </Flex>
  );
};

export default Board;
