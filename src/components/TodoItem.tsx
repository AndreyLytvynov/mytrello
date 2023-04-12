import { Button, Flex, Text } from "@chakra-ui/react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

interface ITodoProps {
  id: string;
  title: string;
  index: number;
}

const onDeleteTodo = () => {};

const TodoItem: React.FC<ITodoProps> = ({ id, title, index }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <Flex
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          as={"li"}
          p={"10px 20px"}
          justifyContent={"space-between"}
          backgroundColor={"white"}
          borderTopRadius={"5px"}
          mb={"5px"}
        >
          <Text fontSize="lg">{title}</Text>
          <Button onClick={onDeleteTodo} colorScheme="teal" size="xs">
            Button
          </Button>
        </Flex>
      )}
    </Draggable>
  );
};

export default TodoItem;
