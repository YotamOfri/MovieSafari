import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import PropTypes from "prop-types";

export default function Mobilemenu({ isOpen, handleClickMenu }) {
  const location = useLocation();
  return (
    <div
      className={`md:hidden flex flex-col gap-5 fixed duration-300 bottom-0 ease-in-out w-52 h-[100dvh] bg-[#0c0f18] pt-6 px-4 ${
        !isOpen ? "-right-full" : "right-0"
      }`}
    >
      <div className="w-full flex justify-between">
        <MdAccountCircle
          onClick={handleClickMenu}
          size={30}
          className="cursor-pointer flex md:hidden hover:text-blue-400 duration-300 ease-in-out"
        ></MdAccountCircle>
        <AiOutlineClose
          onClick={handleClickMenu}
          size={30}
          className="cursor-pointer flex md:hidden hover:text-blue-400 duration-300 ease-in-out"
        ></AiOutlineClose>
      </div>
      <div className="flex flex-col gap-5">
        <Link
          to={"/"}
          className={`text-lg hover:text-blue-400 duration-300 ease-in-out ${
            !location.pathname.includes("Anime")
              ? "border-b-2 border-blue-400"
              : ""
          }`}
        >
          Home
        </Link>
        <Link
          to={"/Anime"}
          className={`text-lg hover:text-blue-400 duration-300 ease-in-out ${
            location.pathname.includes("Anime")
              ? "border-b-2 border-blue-400"
              : ""
          }`}
        >
          Anime
        </Link>
      </div>
    </div>
  );
}
Mobilemenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClickMenu: PropTypes.func.isRequired,
};
