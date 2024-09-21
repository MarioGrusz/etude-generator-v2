/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useState, useEffect } from "react";

export const useLocalStorage = (key: string) => {
  const [isClient, setIsClient] = useState(false); //To prevent window is undefined error

  useEffect(() => {
    setIsClient(typeof window !== "undefined"); // Set to true once the code runs in the browser
  }, []);

  const setItem = (value: unknown) => {
    if (!isClient) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    if (!isClient) return undefined;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    if (!isClient) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};
