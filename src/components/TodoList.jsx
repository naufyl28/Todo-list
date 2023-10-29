import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  getTodo,
  deleteTodo,
  toggleTodoStatus,
  updateEditFlag,
  updateTodo,
} from "../redux/reducers/todo-reducers";

function TodoList() {
  const dispatch = useDispatch();
  const { isLoading, todos } = useSelector((state) => state.todo);
  const [input, setInput] = useState("");
  const [editedValue, setEditedValue] = useState(""); 
  const [filter, setFilter] = useState("all"); 

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    let newTodo = {
      value: input,
      status: false,
    };

    dispatch(addTodo(newTodo));
    setInput("");
  };

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const handleToggleStatus = (todoId) => {
    dispatch(toggleTodoStatus(todoId));
  };

  const handleEdit = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isEditing: true, 
        };
      }
      return todo;
    });
    dispatch(updateEditFlag(updatedTodos));
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditedValue(todoToEdit.value);
  };

  const handleSave = (todoId, updatedValue) => {
    
    dispatch(updateTodo(todoId, { value: updatedValue, isEditing: false }));

    
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          value: updatedValue,
          isEditing: false,
        };
      }
      return todo;
    });
    dispatch(updateEditFlag(updatedTodos));
  };

  
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.status; 
    } else if (filter === "complete") {
      return todo.status; 
    } else {
      return true; 
    }
  });

  return (
    <div className="bg-indigo-50 flex items-center justify-center min-h-screen">
      <div className="p-8 border-solid border-4 border-yellow-300">
        <h1 className="text-4xl font-black font-mono md:font-bold mb-5">
          Hello what's plan for today ?
        </h1>
        <form className="mb-2">
          <input
            className="py-1 px-9 border-solid border-4 border-black"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="m-5 bg-blue-500 text-white px-7 py-2 rounded-md hover-bg-blue-600"
          >
            Add
          </button>
        </form>

        <div>
          <button
            className={`m-2 bg-blue-400 text-white px-7 py-2 rounded-md hover-bg-blue-600 ${
              filter === "all" ? "bg-red-600" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            ALL
          </button>

          <button
            className={`m-2 bg-blue-400 text-white px-7 py-2 rounded-md hover-bg-blue-600 ${
              filter === "active" ? "bg-red-600" : ""
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={`m-2 bg-blue-400 text-white px-7 py-2 rounded-md hover-bg-blue-600 ${
              filter === "complete" ? "bg-red-600" : ""
            }`}
            onClick={() => setFilter("complete")}
          >
            Complete
          </button>
        </div>

        <div>
          {isLoading ? (
            <div>LOADING ...</div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between container mx-auto px-6 py-6 border-double border-4 border-blue-700 m-3"
              >
                <div className="flex items-center">
                  {todo.isEditing ? (
                    <input
                      type="text"
                      value={editedValue} // Use editedValue here
                      onChange={(e) => setEditedValue(e.target.value)} // Store changes in editedValue
                      className="w-full py-1 px-3 border-solid border-2 border-blue-500"
                    />
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={todo.status}
                        onChange={() => handleToggleStatus(todo.id)}
                        className="w-6 h-6"
                      />
                      <span className="ml-5 font-sans font-bold">
                        {todo.value}
                      </span>
                    </>
                  )}
                </div>

                <div>
                  {todo.isEditing ? (
                    <button
                      onClick={() => handleSave(todo.id, editedValue)}
                      className="ml-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="ml-2"
                      onClick={() => handleEdit(todo.id)}
                    >
                      <svg
                        className="h-8 w-8 text-black"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
