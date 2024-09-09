import Cookies from "js-cookie";

const useStorage = (key: string, storageType = "localStorage") => {
  const getItem = () => {
    try {
      let storedValue;
      if (storageType === "localStorage") {
        storedValue = window.localStorage.getItem(key);
      } else if (storageType === "sessionStorage") {
        storedValue = window.sessionStorage.getItem(key);
      } else if (storageType === "cookie") {
        storedValue = Cookies.get(key);
      }
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error reading from storage", error);
      return null;
    }
  };

  const setItem = (value: any) => {
    try {
      const stringifiedValue = JSON.stringify(value);
      if (storageType === "localStorage") {
        window.localStorage.setItem(key, stringifiedValue);
      } else if (storageType === "sessionStorage") {
        window.sessionStorage.setItem(key, stringifiedValue);
      } else if (storageType === "cookie") {
        Cookies.set(key, stringifiedValue, { expires: 7 }); // Cookie expires in 7 days
      }
    } catch (error) {
      console.error("Error saving to storage", error);
    }
  };

  const removeItem = () => {
    try {
      if (storageType === "localStorage") {
        window.localStorage.removeItem(key);
      } else if (storageType === "sessionStorage") {
        window.sessionStorage.removeItem(key);
      } else if (storageType === "cookie") {
        Cookies.remove(key);
      }
    } catch (error) {
      console.error("Error removing from storage", error);
    }
  };

  return { getItem, setItem, removeItem };
};

export default useStorage;
