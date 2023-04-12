import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lists {
  title: string;
  items: {
    id: string;
    title: string;
  }[];
}

interface State {
  lists: Lists[];
}

interface IMovePayload {
  fromIndex: number;
  fromList: number;
  toIndex: number;
  toList: number;
}

interface IAddTodoPayload {
  boardIndex: number;
  todo: string;
}

const initialState: State = {
  lists: [
    {
      title: "todo",
      items: [
        { title: "todo1", id: "1" },
        { title: "todo2", id: "2" },
        { title: "todo3", id: "3" },
      ],
    },
    {
      title: "doing",
      items: [
        { title: "todo4", id: "4" },
        { title: "todo5", id: "5" },
        { title: "todo6", id: "6" },
      ],
    },
    {
      title: "done",
      items: [
        { title: "todo7", id: "7" },
        { title: "todo8", id: "8" },
        { title: "todo9", id: "9" },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    moveCard: (state, action: PayloadAction<IMovePayload>) => {
      console.log("payload", action.payload);
      const stateCopy = state;
      const item =
        state.lists[action.payload.fromList].items[action.payload.fromIndex];

      stateCopy.lists[action.payload.fromList].items.splice(
        action.payload.fromIndex,
        1
      );
      stateCopy.lists[action.payload.toList].items.splice(
        action.payload.toIndex,
        0,
        item
      );

      state = stateCopy;
    },
    addBoard: (state, action: PayloadAction<string>) => {
      state.lists.push({
        title: action.payload,
        items: [],
      });
    },
    addTodo: (state, action: PayloadAction<IAddTodoPayload>) => {
      state.lists[action.payload.boardIndex].items.unshift({
        title: action.payload.todo,
        id: Date.now().toString(),
      });
    },
  },
});

export const { addBoard, moveCard, addTodo } = boardSlice.actions;

export default boardSlice.reducer;
