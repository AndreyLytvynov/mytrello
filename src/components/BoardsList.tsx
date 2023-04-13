import Board from "./Board";
import { useAppSelector } from "../hooks/redux";
import { Box, Flex } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import { moveCard } from "../store/todosSlice";
import { useAppDispatch } from "../hooks/redux";

const BoardsList: React.FC = () => {
  const boards = useAppSelector((state) => state.boards.lists);
  const dispatch = useAppDispatch();

  const handleDropEnd = (result: any) => {
    const { destination, source } = result;

    if (destination) {
      dispatch(
        moveCard({
          fromList: source.droppableId,
          toList: destination.droppableId,
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );
    }
  };

  return (
    <Box w={"100%"}>
      <Flex
        alignItems={"flex-start"}
        m={"0 auto"}
        gap={"20px"}
        overflowX={"auto"}
        w={"100%"}
        minH={"calc(100vh - 100px)"}
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
