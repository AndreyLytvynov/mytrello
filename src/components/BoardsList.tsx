import Board from "./Board";
import { useAppSelector } from "../hooks/redux";
import { Box, Flex } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import { moveCard } from "../store/boardsSlice";
import { useAppDispatch } from "../hooks/redux";

const BoardsList: React.FC = () => {
  const boards = useAppSelector((state) => state.boards.lists);
  const dispatch = useAppDispatch();

  const handleDropEnd = (result: any) => {
    const { destination, source } = result;

    if (destination) {
      dispatch(
        moveCard({
          fromList: Number(source.droppableId),
          toList: Number(destination.droppableId),
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );
    }
  };

  return (
    <Box w={"100%"}>
      <Flex
        as={"ul"}
        alignItems={"flex-start"}
        m={"0 auto"}
        p={"10px"}
        gap={"20px"}
      >
        <DragDropContext onDragEnd={handleDropEnd}>
          {boards.map((board, index) => {
            return (
              <Board
                key={index}
                boardIndex={index}
                titleBoard={board.title}
                todoList={board.items}
              />
            );
          })}
        </DragDropContext>
      </Flex>
    </Box>
  );
};

export default BoardsList;
