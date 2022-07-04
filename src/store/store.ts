import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './todosApi';

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefalultMiddlware) => getDefalultMiddlware().concat(todosApi.middleware),
});
