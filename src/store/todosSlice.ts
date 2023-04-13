import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import formateDate from "../helpers/formatDate";

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

interface IChangeBoardPayload {
  boardIndex: number;
  title: string;
}

const initialState: State = {
  lists: [
    {
      title: "Todo",
      items: [
        {
          title: "Wash the dishes.",
          id: "1",
          date: "12.4.2023 23:58",
          name: "Andrey",
        },
        {
          title: "Take out the trash.",
          id: "2",
          date: "12.4.2023 23:58",
          name: "Vika",
        },
        {
          title: "Cook dinner.",
          id: "3",
          date: "12.4.2023 23:58",
          name: "Katya",
        },
      ],
    },
    {
      title: "Doing",
      items: [
        {
          title: "Vacuum the floor.",
          id: "4",
          date: "12.4.2023 23:58",
          name: "polya",
        },
        {
          title: "Mop the floor.",
          id: "5",
          date: "12.4.2023 23:58",
          name: "polya",
        },
      ],
    },
    {
      title: "Done",
      items: [
        {
          title: "Walk the dog.",
          id: "7",
          date: "12.4.2023 23:58",
          name: "Sveta",
        },
        {
          title: "Go to the store for groceries.",
          id: "8",
          date: "12.4.2023 23:58",
          name: "Vika",
        },
        {
          title: "Wash the windows.",
          id: "9",
          date: "12.4.2023 23:58",
          name: "polya",
        },
      ],
    },
  ],
};

const todosSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<string>) => {
      state.lists.push({
        title: action.payload,
        items: [],
      });
    },
    changeBoard: (state, action: PayloadAction<IChangeBoardPayload>) => {
      state.lists[action.payload.boardIndex].title = action.payload.title;
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
        return { ...todo, title: textTodo, name, date: formateDate() };
      });
    },
    deleteTodo: (state, action: PayloadAction<IDeleteTodoPayload>) => {
      const { boardIndex, id } = action.payload;

      const items = state.lists[boardIndex].items;

      state.lists[boardIndex].items = items.filter((item) => item.id !== id);
    },
    moveCard: (state, action: PayloadAction<IMovePayload>) => {
      const { fromList, fromIndex, toList, toIndex } = action.payload;

      const item = state.lists[fromList].items[fromIndex];
      state.lists[fromList].items[fromIndex].date = formateDate();

      state.lists[fromList].items.splice(fromIndex, 1);
      state.lists[toList].items.splice(toIndex, 0, item);
    },
  },
});

export const {
  addBoard,
  changeBoard,
  deleteBoard,
  moveCard,
  addTodo,
  deleteTodo,
  changeTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
