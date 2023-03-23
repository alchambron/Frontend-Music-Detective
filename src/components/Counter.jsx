import {  useEffect, useState } from "react";

export default function Countdown({ time, onFinish }) {
  const [countdown, setCountdown] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1 >= 0 ? countdown - 1 : 0);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFinish();
    }, time * 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return <div className="game-counter">{countdown === 0 ? "" : countdown}</div>;
}
