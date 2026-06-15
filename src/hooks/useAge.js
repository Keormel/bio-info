import { useState, useEffect } from "react";

export function useAge(birthDateString) {
  const [age, setAge] = useState(0);

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date(birthDateString);
      const today = new Date();

      const diffTime = today - birthDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      const ageInYears = diffDays / 365.25;

      return ageInYears.toFixed(3);
    };

    setAge(calculateAge());

    // Update every hour to keep it accurate
    const interval = setInterval(() => {
      setAge(calculateAge());
    }, 3600000);

    return () => clearInterval(interval);
  }, [birthDateString]);

  return age;
}
