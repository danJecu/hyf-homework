import { createContext, useEffect, useMemo, useReducer } from 'react';
import { actions } from '../utils/actions';

export const ToDosContext = createContext();

const initialState = {
  todos: [],
};

const toDosReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_TODOS:
      return { todos: action.payload };
    case actions.ADD_TODO:
      return { todos: [...state.todos, action.payload] };
    case actions.UPDATE_TODO:
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
      let response;
      try {
        response = await fetch(
          'https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw'
        );
      } catch (error) {
        throw new Error(error);
      }
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: actions.GET_TODOS, payload: data });
      }
    }

    fetchData();
  }, []);

  const handleAdd = (todo) => {
    dispatch({ type: actions.ADD_TODO, payload: todo });
  };

  const handleUpdate = (todo) => {
    if (state.todos.some((t) => t.id === todo.id)) {
      dispatch({ type: actions.UPDATE_TODO, payload: todo });
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = state.todos.filter((todo) => todo.id !== id);
    dispatch({ type: actions.GET_TODOS, payload: updatedTodos });
  };

  const value = useMemo(() => {
    return {
      ...state,
      dispatch,
      handleAdd,
      handleUpdate,
      handleDelete,
    };
  }, [state, dispatch, handleDelete]);

  return (
    <ToDosContext.Provider value={value}>{children}</ToDosContext.Provider>
  );
};
