import { useState, useEffect } from "react";
import useStorage from "./useStorage";

const useStorageArray = <T>(
  key: string,
  initialValue = [],
  storageType = "localStorage"
) => {
  const { getItem, setItem } = useStorage<T>(key, storageType);

  const [items, setItems] = useState(() => {
    const storedValue = getItem();
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    setItem(items);
  }, [items, setItem]);

  const addItem = <T>(item: T) => {
    setItems((prevItems: T[]) => [...prevItems, item]);
  };

  const removeItem = <T>(filterCb: (i: T) => boolean) => {
    setItems((prevItems: T[]) => prevItems.filter(filterCb));
  };

  const clearItems = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    clearItems,
  };
};

export default useStorageArray;
