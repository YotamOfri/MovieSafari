import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import userInfo from "../user/userInfo";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const { data, status, refetch } = useQuery({
    queryKey: ["userInformation"],
    queryFn: userInfo,
    retry: false,
    refetchOnWindowFocus: false, // Disable automatic refetching on window focus
  });

  useEffect(() => {
    if (status === "success") {
      setUser(data);
    }
  }, [status, data]);

  const refreshUserInfo = () => {
    refetch();
  };

  // Add a function to handle timeout
  const fetchWithTimeout = (timeout) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        reject(new Error("Timeout"));
      }, timeout);

      refetch()
        .then((data) => {
          clearTimeout(timer);
          resolve(data);
        })
        .catch((error) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  };

  // Modified refreshUserInfo to include timeout
  const refreshUserInfoWithTimeout = async (timeout = 10000) => {
    try {
      const result = await Promise.race([
        fetchWithTimeout(timeout),
        new Promise((resolve) => setTimeout(() => resolve(false), timeout)),
      ]);
      return result;
    } catch (error) {
      console.error("Error occurred while fetching user information:", error);
      return false;
    }
  };

  return { user, setUser, status, refreshUserInfo: refreshUserInfoWithTimeout };
};

export default useAuth;
