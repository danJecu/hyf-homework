import { createContext, useMemo, useReducer } from 'react';

export const SearchContext = createContext();

const initialState = {
  githubUsers: [],
  searchQuery: '',
  error: '',
};

export const actions = {
  GET_SEARCH: 'GET_SEARCH',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_ERROR: 'SET_ERROR',
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_SEARCH:
      return { ...state, githubUsers: action.payload };
    case actions.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case actions.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
