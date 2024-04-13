import { useState, useCallback } from "react";
import Bookmarks from "./Bookmarks";
import Profile from "./Profile"; // Assuming you have a Profile component

const sections = {
  profile: Profile,
  bookmarks: Bookmarks,
  // Add more sections as needed
};

export default function User({ page }) {
  const [section, setSection] = useState(page);

  // Optimized handleClick using useCallback to memoize the function
  const handleClick = useCallback(
    (info) => () => {
      setSection(info);
      window.history.pushState(null, "", info);
    },
    []
  );

  const SectionComponent = sections[section];

  return (
    <div className="min-h-[450px] py-28 sm:px-12 px-4 max-w-[2000px] m-auto text-gray-400 flex gap-4 sm:flex-row flex-col">
      <div className="flex flex-col h-full gap-1 child-hover:bg-zinc-800 child:gap-2 sm:w-1/4 w-full">
        {Object.keys(sections).map((key) => (
          <button
            key={key}
            className={`${
              section === key && "bg-[#030711] border border-slate-800"
            } text-left h-12 rounded-lg flex items-center duration-300 ease-in-out px-2`}
            onClick={handleClick(key)}
          >
            <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
          </button>
        ))}
      </div>
      <div className="sm:w-[80%]  w-full border-slate-800 border rounded-lg p-2">
        {SectionComponent ? <SectionComponent /> : <p>No section selected</p>}
      </div>
    </div>
  );
}
