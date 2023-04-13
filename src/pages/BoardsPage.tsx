import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import BoardsList from "../components/BoardsList";
import AddBoardModal from "../components/AddBoardModal";

const BoardsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box backgroundColor={"blue.100"} px={"20px"}>
      <Heading textAlign={"center"}>My Todo</Heading>
      <Button onClick={onOpen} colorScheme="linkedin" mb={"10px"}>
        Add board
      </Button>
      <AddBoardModal isOpen={isOpen} onClose={onClose} />
      <BoardsList />
    </Box>
  );
};

export default BoardsPage;