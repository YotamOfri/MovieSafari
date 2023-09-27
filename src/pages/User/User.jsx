import { motion } from "framer-motion";
import PropTypes from "prop-types";
import UserEnter from "./UserEnter";
import "../../assets/Styles/UserForm.css";
import Backdrop from "../../components/Animations/Backdrop";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import UserRegister from "./UserRegister";
export default function User({ onClick }) {
  const [page, setPage] = useState(1);
  const dropIn = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 100,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 1.2,
        stiffness: 100,
      },
    },
  };
  return (
    <Backdrop onClick={onClick} side={"justify-center"}>
      <motion.div
        className={`bg-[#0c0f18] my-2 max-w-[400px] w-[90%]  ${
          page === 1 ? "h-96" : "h-[450px]"
        } p-3 rounded-md border border-blue-950/50`}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-full flex justify-end">
          <AiOutlineClose
            onClick={onClick}
            size={30}
            className="cursor-pointer flex hover:text-blue-400 duration-300 ease-in-out"
          ></AiOutlineClose>
        </div>
        {page === 1 ? (
          <UserEnter setPage={setPage}></UserEnter>
        ) : (
          <UserRegister setPage={setPage}></UserRegister>
        )}
      </motion.div>
    </Backdrop>
  );
}
User.propTypes = {
  onClick: PropTypes.func,
};
