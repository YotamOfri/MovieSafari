import Logo from "../../assets/Logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { NavScroll } from "./NavScrollFunc";
import Desktopmenu from "./Desktopmenu";
import Mobilemenu from "./Mobilemenu";
import { useState } from "react";
import Useravatar from "./Useravatar";
export default function Navigation() {
  const { visible, prevScrollPos } = NavScroll();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };
  // Styles
  const NavBackground = !(prevScrollPos >= 100) && "md:bg-transparent ";
  const NavOpacity = visible ? "opacity-100" : "opacity-0 pointer-events-none";
  return (
    <div
      className={`${NavOpacity} ${NavBackground} bg-black/50 text-white h-20 w-full fixed duration-300 ease-in-out min-w-[280px] z-50`}
    >
      <div className="w-[100vw] flex items-center justify-between h-full px-4">
        {/* Logo Section */}
        <Link to={"/"} className="md:w-1/3 w-fit">
          <div className="flex items-center cursor-pointer w-fit">
            <img src={Logo} alt="Logo" className="h-10 w-10" />
            <h1 className="font-bold text-2xl ml-2">MovieSafari</h1>
          </div>
        </Link>
        {/* Middle Section */}
        <Desktopmenu></Desktopmenu>
        {isOpen && <Mobilemenu handleClickMenu={handleClickMenu}></Mobilemenu>}
        {/* Search Section */}
        <div className="w-1/3 flex items-center justify-end space-x-4">
          <Link
            to={
              !location.pathname.includes("Anime") ? "/Search" : "/Anime/Search"
            }
            className={`text-xl hover:text-blue-400 duration-300 ease-in-out ${
              location.pathname.includes("Search") && "text-blue-400"
            }`}
          >
            <AiOutlineSearch size={35} />
          </Link>
          <Useravatar isMobile={false} />
          {/* Mobile Hamburger */}
          <MdMenu
            onClick={handleClickMenu}
            size={30}
            className="cursor-pointer flex md:hidden hover:text-blue-400 duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}
