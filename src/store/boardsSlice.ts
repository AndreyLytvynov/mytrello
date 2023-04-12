import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lists {
  title: string;
  items: {
    id: string;
    title: string;
    date: string;
    name: string;
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
  todoText: string;
  date: string;
  name: string;
}
interface IDeleteTodoPayload {
  boardIndex: number;
  id: string;
}

interface IUpdateTodoPayload extends IDeleteTodoPayload {
  textTodo: string;
  name: string;
}

const initialState: State = {
  lists: [
    {
      title: "todo",
      items: [
        { title: "todo1", id: "1", date: "12.4.2023 23:58", name: "Andrey" },
        { title: "todo2", id: "2", date: "12.4.2023 23:58", name: "Vika" },
        { title: "todo3", id: "3", date: "12.4.2023 23:58", name: "Katya" },
      ],
    },
    {
      title: "doing",
      items: [
        { title: "todo4", id: "4", date: "12.4.2023 23:58", name: "polya" },
      ],
    },
    {
      title: "done",
      items: [
        { title: "todo7", id: "7", date: "12.4.2023 23:58", name: "Sveta" },
        { title: "todo8", id: "8", date: "12.4.2023 23:58", name: "Vika" },
        { title: "todo9", id: "9", date: "12.4.2023 23:58", name: "polya" },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    moveCard: (state, action: PayloadAction<IMovePayload>) => {
      const { fromList, fromIndex, toList, toIndex } = action.payload;

      const item = state.lists[fromList].items[fromIndex];
      state.lists[fromList].items.splice(fromIndex, 1);
      state.lists[toList].items.splice(toIndex, 0, item);
    },
    addBoard: (state, action: PayloadAction<string>) => {
      state.lists.push({
        title: action.payload,
        items: [],
      });
    },
    deleteBoard: (state, action: PayloadAction<number>) => {
      state.lists.splice(action.payload, 1);
    },
    addTodo: (state, action: PayloadAction<IAddTodoPayload>) => {
      state.lists[action.payload.boardIndex].items.unshift({
        title: action.payload.todoText,
        id: Date.now().toString(),
        date: action.payload.date,
        name: action.payload.name,
      });
    },
    changeTodo: (state, action: PayloadAction<IUpdateTodoPayload>) => {
      const { boardIndex, id, textTodo, name } = action.payload;
      const items = state.lists[boardIndex].items;
      state.lists[boardIndex].items = items.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, title: textTodo, name };
      });
    },
    deleteTodo: (state, action: PayloadAction<IDeleteTodoPayload>) => {
      const { boardIndex, id } = action.payload;
      const items = state.lists[boardIndex].items;
      state.lists[boardIndex].items = items.filter((item) => item.id !== id);
    },
  },
});

export const {
  addBoard,
  deleteBoard,
  moveCard,
  addTodo,
  deleteTodo,
  changeTodo,
} = boardSlice.actions;

export default boardSlice.reducer;
