import { useState, useContext } from 'react';
import { SearchContext, actions } from '../contexts/SearchContext';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const { dispatch } = useContext(SearchContext);

  const handleSearchQuery = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    if (dispatch) {
      dispatch({ type: actions.SET_SEARCH_QUERY, payload: value });
    }
  };

  return (
    <header className="sticky top-0 rounded bg-white">
      <nav className="flex w-full items-center justify-center shadow-lg shadow-indigo-300">
        <input
          type="text"
          placeholder="start your search..."
          value={searchValue}
          onChange={handleSearchQuery}
          className="my-4  w-1/4 rounded bg-gray-200 p-2 focus:bg-indigo-200 focus:outline-0"
        />
      </nav>
    </header>
  );
}
