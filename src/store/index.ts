import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todosSlice";
import {
  persistStore,
  Persistor,
  persistReducer,
  PERSIST,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const contactsPersistConfig = {
  key: "todos",
  storage,
};

const tokenPersistReducer = persistReducer(contactsPersistConfig, todosSlice);

const store = configureStore({
  reducer: {
    boards: tokenPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor: Persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
