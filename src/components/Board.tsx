import React, { useState } from "react";
import TodoItem from "./TodoItem";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import AddTodoModal from "./AddTodoModal";
import { DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { deleteBoard, changeBoard } from "../store/todosSlice";
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
  const [title, setTitle] = useState<string>(titleBoard);
  const [isChangeBoard, setIsChangeBoard] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onChangeBoardName = () => {
    if (title.length === 0) return;
    dispatch(changeBoard({ boardIndex, title }));
    setIsChangeBoard(!isChangeBoard);
  };

  const onDeleteBoard = () => {
    dispatch(deleteBoard(boardIndex));
  };
  const onChangeBoardTitle: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTitle(e.target.value);
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      minH={"100px"}
      minW={{ base: "200px", md: "250px" }}
      p={"10px"}
      backgroundColor={"gray.100"}
      borderTopRadius={"10px"}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        {isChangeBoard ? (
          <InputGroup size="sm" w={"174px"}>
            <Input
              onBlur={() => {
                setIsChangeBoard(false);
                onChangeBoardName();
              }}
              autoFocus={true}
              type="text"
              value={title}
              onChange={onChangeBoardTitle}
              variant="flushed"
              fontSize={"lg"}
              fontWeight={700}
              placeholder={"Enter your name"}
              _placeholder={{ fontSize: "10px" }}
            />
            <InputRightElement>
              <Button h={0} minW={0} onClick={onChangeBoardName}>
                <EditIcon boxSize={4} _hover={{ color: "blackAlpha.600" }} />
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          <Heading
            size="md"
            textAlign={"center"}
            ml={"15px"}
            onDoubleClick={() => {
              setIsChangeBoard(!isChangeBoard);
            }}
            cursor={"text"}
          >
            {titleBoard}
          </Heading>
        )}

        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                backgroundColor={"red"}
                isActive={isOpen}
                as={Button}
                color="gray.400"
                rightIcon={<DragHandleIcon _hover={{ color: "gray.500" }} />}
                h={0}
                minW={0}
                border={"none"}
              />
              <MenuList>
                <MenuItem onClick={onDeleteBoard}>Deleted</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
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
