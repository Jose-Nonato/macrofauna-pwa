import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  function update(val) {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  }
  return [value, update];
}
