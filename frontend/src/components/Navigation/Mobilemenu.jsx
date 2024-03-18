import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { motion } from "framer-motion";
import Backdrop from "../Animations/Backdrop";
import PropTypes from "prop-types";
export default function Mobilemenu({ handleClickMenu, handleClickUser }) {
  const location = useLocation();
  // Styles
  const dropIn = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: "0",
      opacity: 1,
    },
    exit: {
      x: "100vw",
      opacity: 0,
    },
  };
  return (
    <div className="md:hidden">
      <Backdrop onClick={handleClickMenu} side={"justify-end"}>
        <motion.div
          className={`md:hidden flex flex-col gap-5 fixed duration-300 bottom-0 ease-in-out w-52 h-[100dvh] bg-[#0c0f18] pt-6 px-4`}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0 }}
        >
          <div className="w-full flex justify-between">
            <MdAccountCircle
              onClick={handleClickUser}
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
                !location.pathname.includes("Anime") &&
                !location.pathname.includes("Search") &&
                "border-b-2 border-blue-400"
              }`}
            >
              Home
            </Link>
            <Link
              to={"/Anime"}
              className={`text-lg hover:text-blue-400 duration-300 ease-in-out ${
                location.pathname.includes("Anime") &&
                !location.pathname.includes("Search") &&
                "border-b-2 border-blue-400"
              }`}
            >
              Anime
            </Link>
          </div>
        </motion.div>
      </Backdrop>
    </div>
  );
}
Mobilemenu.propTypes = {
  handleClickMenu: PropTypes.func.isRequired,
  handleClickUser: PropTypes.func.isRequired,
};
