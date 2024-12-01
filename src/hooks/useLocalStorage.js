// src/useLocalStorage.js, final code

import { useState, useEffect, useLayoutEffect, useRef } from "react";

const useLocalStorage = (key, defaultValue) => {
  const isMounted = useRef(false)
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    try {
      if (isMounted.current) {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        isMounted.current = true;
      }
    } catch (error) {
      console.log("STORAGE SET ERROR", error)
    }
  }, [value, key]);

  useLayoutEffect(() => {
    try {
      const storageValue = window.localStorage.getItem(key) != null ? JSON.parse(window.localStorage.getItem(key)) : defaultValue;
  
      if (storageValue) {
        if (Array.isArray(storageValue) || typeof storageValue === 'object') {
          storageValue.length > 0 && setValue(storageValue)
        } else {
          setValue(storageValue)
        }
      }
      
    } catch (error) {
      console.log("STORAGE GET", error)
    }

    return () => {
      isMounted.current = false;
    }
  }, [])

  const clearStorage = () => {
    setValue(defaultValue)
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }

  return [value, setValue, clearStorage];
};

export default useLocalStorage;