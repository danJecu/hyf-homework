import { useContext, useEffect, useState } from 'react';
import { SearchContext, actions } from '../contexts/SearchContext';

import User from './User';

export default function Display() {
  const [loading, setLoading] = useState(false);

  const { dispatch, searchQuery, githubUsers, error } =
    useContext(SearchContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!searchQuery) {
      return;
    }

    (async () => {
      let res;
      try {
        setLoading(true);
        res = await fetch(
          `https://api.github.com/search/users?q=${searchQuery}&per_page=20`,
          {
            signal,
          }
        );
      } catch (err) {
        dispatch({ type: actions.SET_ERROR, payload: err });
        setLoading(false);
      }

      if (res.status === 200) {
        const json = await res.json();
        dispatch({ type: actions.GET_SEARCH, payload: json.items });
      } else {
        dispatch({
          type: actions.SET_ERROR,
          payload: `Something went wrong try to refresh the page`,
        });
      }
      setLoading(false);
    })();

    return () => {
      controller.abort();
    };
  }, [dispatch, searchQuery]);

  if (error.length && !githubUsers) {
    return <div className="mt-24 text-center text-3xl font-bold">{error}</div>;
  }

  return (
    <div className="h-full p-10">
      {loading ? (
        <div className="text-center font-bold text-gray-500">loading...</div>
      ) : (
        ''
      )}

      {githubUsers.length && searchQuery ? (
        <ul className="flex flex-wrap justify-center gap-10">
          {githubUsers ? (
            githubUsers.map((d) => <User key={d.id} user={d} />)
          ) : (
            <div>"No results found..."</div>
          )}
        </ul>
      ) : (
        <div className="text-center text-3xl font-bold">No results...</div>
      )}
    </div>
  );
}
