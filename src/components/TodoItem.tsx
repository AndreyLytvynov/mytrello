import { Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { useAppDispatch } from "../hooks/redux";
import { deleteTodo } from "../store/todosSlice";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ChangeTodoModal from "./ChangeTodoModal";

interface ITodoProps {
  id: string;
  title: string;
  index: number;
  boardIndex: number;
  date: string;
  name: string;
}

const TodoItem: React.FC<ITodoProps> = ({
  id,
  title,
  index,
  boardIndex,
  date,
  name,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const onDeleteTodo = () => {
    dispatch(deleteTodo({ id, boardIndex }));
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <Flex
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          backgroundColor={"white"}
          p={"5px"}
          mb={"5px"}
          as={"li"}
          minH={"120px"}
          borderTopRadius={"5px"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Flex justifyContent={"space-between"}>
            <Text
              p={"5px"}
              maxW={"190px"}
              overflowWrap="break-word"
              whiteSpace="normal"
              fontSize="xs"
            >
              {title}
            </Text>

            <Flex flexDirection={"column"} justifyContent={"flex-start"}>
              <IconButton
                onClick={onOpen}
                variant="outline"
                colorScheme="teal"
                aria-label="delete board"
                icon={
                  <EditIcon fontSize="15px" _hover={{ color: "teal.500" }} />
                }
                h={"25px"}
                minW={"25px"}
                border={"none"}
              />
              <IconButton
                onClick={onDeleteTodo}
                variant="outline"
                colorScheme="teal"
                aria-label="delete board"
                icon={
                  <DeleteIcon fontSize="15px" _hover={{ color: "teal.500" }} />
                }
                h={"25px"}
                minW={"25px"}
                border={"none"}
              />
              <ChangeTodoModal
                isOpen={isOpen}
                onClose={onClose}
                id={id}
                boardIndex={boardIndex}
                executor={name}
                title={title}
              />
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize="12px" fontWeight={700}>
              {name}
            </Text>
            <Text fontSize="10px" fontWeight={700}>
              upd: {date}
            </Text>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
};

export default TodoItem;
