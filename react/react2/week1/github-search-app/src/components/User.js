/* import { useEffect, useState } from 'react'; */

export default function User({ user }) {
  // Getting the number of repositories / user && if the limit of requests was reached you have to comment out this useEffect.
  /* const [repos, setRepos] = useState([]); */

  /*  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(user.repos_url);
        const json = await res.json();

        setRepos(json);
      } catch (err) {
        setRepos(err);
      }
    })();
  }, [user.repos_url]); */

  /* if (repos.message) {
    return <div className="text-center font-bold">{repos.message}</div>;
  } */

  return (
    <li className="h-62 flex w-64 flex-col items-center justify-center  gap-3  rounded-lg border-inherit bg-white p-4 font-sans shadow-lg hover:bg-indigo-300">
      <span className="text-lg font-bold">{user.login}</span>
      <img
        src={user.avatar_url}
        alt="user avatar"
        className="mb-3 h-24 w-24 rounded-full shadow-lg"
      />
      {/* Display number of repos
      <span className="font-medium">{repos.length} Repositories</span> */}
      <span>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github icon"
            width="32px"
          />
        </a>
      </span>
    </li>
  );
}
