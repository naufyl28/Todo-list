import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: "",
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "START_FETCHING":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS_GET_TODO":
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case "SUCCESS_UPDATE_EDIT_FLAG":
      return {
        ...state,
        todos: action.payload,
      };
    case "SUCCESS_DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "STOP_FETCHING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

function startFetching() {
  return {
    type: "START_FETCHING",
  };
}

function successGetTodo(data) {
  return {
    type: "SUCCESS_GET_TODO",
    payload: data,
  };
}

function successDeleteTodo(todoId) {
  return {
    type: "SUCCESS_DELETE_TODO",
    payload: todoId,
  };
}

function deleteTodo(todoId) {
  return async function (dispatch) {
    dispatch(startFetching());
    try {
      await axios.delete(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Todo/${todoId}`
      );
      dispatch(successDeleteTodo(todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      dispatch(stopFetching());
    }
  };
}

function addTodo(newTodo) {
  return async function (dispatch) {
    dispatch(startFetching());
    try {
      await axios.post(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Todo`,
        newTodo
      );
      dispatch(getTodo());
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      dispatch(stopFetching());
    }
  };
}

function toggleTodoStatus(todoId) {
  return async function (dispatch) {
    dispatch(startFetching());
    try {
      // Fetch the current todo
      const response = await axios.get(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Todo/${todoId}`
      );
      const currentTodo = response.data;

      
      const updatedTodo = { ...currentTodo, status: !currentTodo.status };

      
      await axios.put(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Todo/${todoId}`,
        updatedTodo
      );

      dispatch(getTodo());
    } catch (error) {
      console.error("Error toggling todo status:", error);
    } finally {
      dispatch(stopFetching());
    }
  };
}

function updateTodo(todoId, updatedTodo) {
  return async function (dispatch) {
    dispatch(startFetching());
    try {
      await axios.put(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Todo/${todoId}`,
        updatedTodo
      );
      dispatch(getTodo());
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      dispatch(stopFetching());
    }
  };
}

function updateEditFlag(updatedTodos) {
  return async function (dispatch) {
    dispatch(startFetching());
    try {
      // Your logic to update the editing flag
      dispatch(successUpdateEditFlag(updatedTodos));
    } catch (error) {
      console.error("Error updating edit flag:", error);
    } finally {
      dispatch(stopFetching());
    }
  };
}

function successUpdateEditFlag(updatedTodos) {
  return {
    type: "SUCCESS_UPDATE_EDIT_FLAG",
    payload: updatedTodos,
  };
}

function getTodo() {
  return async function (dispatch) {
    dispatch(startFetching());

    try {
      const response = await axios.get(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Todo`
      );
      dispatch(successGetTodo(response.data));
    } catch (error) {
      console.error("Error getting todos:", error);
    } finally {
      dispatch(stopFetching());
    }
  };
}

function stopFetching() {
  return {
    type: "STOP_FETCHING",
  };
}

export {
  todoReducer,
  startFetching,
  successGetTodo,
  successDeleteTodo,
  deleteTodo,
  addTodo,
  toggleTodoStatus,
  updateTodo,
  updateEditFlag,
  successUpdateEditFlag,
  getTodo,
  stopFetching,
};
