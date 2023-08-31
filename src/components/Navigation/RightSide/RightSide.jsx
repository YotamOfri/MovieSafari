import PropTypes from "prop-types";
import { useState } from "react";
import { Search } from "./Search";
export function RightSide({ SetIsOpen }) {
  // States
  const [isSearchOpen, setIstSearchOpen] = useState(false);
  // handle's
  const handleClickMenu = () => {
    SetIsOpen((current) => (current ? false : true));
  };
  const handleClickOutside = (event) => {
    if (event.target.classList.contains("outline-none")) return;
    else {
      document.removeEventListener("click", handleClickOutside);
      setIstSearchOpen(false);
    }
  };
  const handleClickSearch = () => {
    setIstSearchOpen((current) => (current ? false : true));
    if (!isSearchOpen)
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
  };
  return (
    <ul className="flex justify-end h-fit items-center gap-5">
      <li className="flex items-center sm:relative">
        <i
          className={`bx bx-search text-3xl cursor-pointer ${
            isSearchOpen && ""
          }`}
          onClick={handleClickSearch}
        ></i>
        {isSearchOpen && <Search></Search>}
      </li>
      <li>
        <button className="hidden sm:flex">
          <i className="bx bxs-user-circle text-3xl"></i>
        </button>
        <button className="flex sm:hidden" onClick={handleClickMenu}>
          <i className="bx bx-menu text-3xl"></i>
        </button>
      </li>
    </ul>
  );
}
RightSide.propTypes = {
  SetIsOpen: PropTypes.func,
};
