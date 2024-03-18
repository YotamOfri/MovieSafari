import { useEffect, useState } from "react";
export const getPasswordFromLocalStorage = () => {
  return localStorage.getItem("password");
};

export const setPasswordInLocalStorage = (password) => {
  if (password) {
    localStorage.setItem("password", password);
  } else {
    localStorage.removeItem("password");
  }
};

export const useAuthorization = () => {
  const storedPassword = getPasswordFromLocalStorage();
  const [isAuthorized, setIsAuthorized] = useState(storedPassword);
  useEffect(() => {
    if (isAuthorized) {
      setPasswordInLocalStorage(isAuthorized);
    } else {
      setPasswordInLocalStorage(null);
    }
  }, [isAuthorized]);

  return { isAuthorized, setIsAuthorized };
};
