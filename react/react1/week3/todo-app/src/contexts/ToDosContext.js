import { createContext, useEffect, useReducer } from 'react';

export const ToDosContext = createContext();

const initialState = {
  todos: [],
};

const toDosReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return { todos: action.payload };
    case 'ADD_TODO':
      return { todos: [...state.todos, action.payload] };
    case 'UPDATE_TODO':
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return { todos: updatedTodos };
    default:
      return state;
  }
};

export const ToDosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toDosReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw'
        );
        const data = await response.json();
        if (data) {
          dispatch({ type: 'GET_TODOS', payload: data });
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const updatedTodos = state.todos.filter((todo) => todo.id !== id);
    dispatch({ type: 'GET_TODOS', payload: updatedTodos });
  };

  const handleAddUpdate = (todo) => {
    if (state.todos.some((t) => t.id === todo.id)) {
      // Update existing todo
      dispatch({ type: 'UPDATE_TODO', payload: todo });
    } else {
      // Add new todo
      dispatch({ type: 'ADD_TODO', payload: todo });
    }
  };

  return (
    <ToDosContext.Provider
      value={{
        ...state,
        dispatch,
        handleDelete,
        handleAddUpdate,
      }}
    >
      {children}
    </ToDosContext.Provider>
  );
};
