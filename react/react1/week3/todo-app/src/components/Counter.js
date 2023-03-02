import { useEffect, useState } from 'react';

export default function Counter() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
  });

  return <h5>You have spent {seconds} seconds on this website.</h5>;
}
