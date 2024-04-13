import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import userInfo from "../user/userInfo";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const { data, status, refetch } = useQuery({
    queryKey: ["userInformation"],
    queryFn: userInfo,
    retry: false,
  });

  useEffect(() => {
    if (status === "success") {
      setUser(data);
    }
  }, [status, data]);
  const refreshUserInfo = () => {
    refetch();
  };

  return { user, setUser, status, refreshUserInfo };
};

export default useAuth;
