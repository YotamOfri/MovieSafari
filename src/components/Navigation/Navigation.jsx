import { useState } from "react";
import { NavScroll } from "./NavScrollFunc";
import { MiddleSide } from "./MiddleSide";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide/RightSide";
import { MobileMenu } from "./Mobilemenu";
export function Navigation() {
  // States
  const { visible } = NavScroll();
  const [isOpen, SetIsOpen] = useState(false); // Mobile Menu
  // functions
  console.log(visible);
  return (
    <div
      className={`z-50 sm:fixed sticky top-0 sm:h-24  w-full transition-all duration-300 ease-in-out flex flex-col px-5 sm:bg-transparent bg-slate-800    ${
        visible
          ? "sm:opacity-100 sm:pointer-events-auto"
          : "sm:opacity-0 sm:pointer-events-none"
      } ${isOpen ? "overflow-hidden h-64" : "h-24"}`}
    >
      <div className="w-full h-24 flex items-center sm:justify-center justify-between flex-shrink-0 relative">
        <div className="w-1/3 h-full items-center flex">
          <LeftSide></LeftSide>
        </div>
        <div className="w-1/3 h-full hidden sm:flex justify-center items-center">
          <MiddleSide></MiddleSide>
        </div>
        <div className="w-1/3 h-full items-center flex justify-end">
          <RightSide isOpen={isOpen} SetIsOpen={SetIsOpen}></RightSide>
        </div>
      </div>
      {isOpen && <MobileMenu></MobileMenu>}
    </div>
  );
}
