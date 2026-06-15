import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const pad = (value) => String(value).padStart(2, "0");
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };

    tick();
    const id = window.setInterval(tick, 1000);

    return () => window.clearInterval(id);
  }, []);

  return time;
}
