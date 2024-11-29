// src/useLocalStorage.js, final code

import { useState, useEffect, useLayoutEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  useLayoutEffect(() => {
    const storageValue = localStorage.getItem(key) != null ? JSON.parse(localStorage.getItem(key)) : defaultValue;

    if (storageValue) {
      setValue(storageValue)
    }
  }, [])

  return [value, setValue];
};

export default useLocalStorage;