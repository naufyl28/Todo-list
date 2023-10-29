import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, startFetching, successGetTodo, deleteTodo, addTodo, 
  toggleTodoStatus, 
  updateEditFlag, 
  getTodo  } from "./reducers/todo-reducers";

const store = configureStore({
  reducer: {
    todo: todoReducer
  }
});

export default store;
