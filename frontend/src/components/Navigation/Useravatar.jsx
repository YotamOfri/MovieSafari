import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { WebsiteContext } from "../../context/WebsiteContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import logout from "@/hooks/auth/logout";
export default function Useravatar({ isMobile }) {
  const { user } = useContext(WebsiteContext);
  const { mutate, isSuccess, isError, error, isPending } = useMutation({
    mutationFn: logout,
  });
  const handleLogout = async () => {
    mutate();
  };
  useEffect(() => {
    if (isSuccess) window.location.reload();
  }, [isSuccess, isError, error, isPending]);
  return (
    <div className={`${!isMobile ? "hidden md:flex" : "flex md:hidden"}`}>
      {user?.username && (
        <div className="w-10 h-10 bg-zinc-900 rounded-full flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-full outline-none">
              {user.username[0]}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={"/profile"}>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link to={"/bookmarks"}>
                <DropdownMenuItem className="cursor-pointer">
                  Bookmarks
                </DropdownMenuItem>
              </Link>
              <div onClick={handleLogout}>
                <DropdownMenuItem className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {!user?.username && (
        <Link
          to="/login"
          className="w-10 h-10 flex justify-center items-center"
        >
          <MdAccountCircle
            size={35}
            className="cursor-pointer md:flex hover:text-blue-400 duration-300 ease-in-out"
          />
        </Link>
      )}
    </div>
  );
}
Useravatar.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};
