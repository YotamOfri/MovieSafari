import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import userInfo from "../user/userInfo";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const { data, status } = useQuery({
    queryKey: ["userInformation"],
    queryFn: userInfo,
    retry: false,
    enabled: user === null,
  });
  useEffect(() => {
    if (status === "success" && data) setUser(data);
  }, [status, data]);

  return { user, setUser, status };
};

export default useAuth;
