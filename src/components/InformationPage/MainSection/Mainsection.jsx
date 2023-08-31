import { useContext, useState } from "react";
import { InformationContext } from "../InformationContext";
import { Suggestions } from "./Suggestions/Suggestions";
import { Episodes } from "./Episodes/Episodes";
export function Mainsection() {
  const { MediaType } = useContext(InformationContext);
  const [tab, setTab] = useState(MediaType === "tv" ? "tv" : "suggestions");
  const handleClick = (input) => () => {
    if (input === tab) return;
    setTab(input);
  };
  console.log(tab);
  return (
    <div className="flex flex-col gap-5 mx-5 ">
      <div className=" border-b-4 border-gray-600 pt-9">
        <div className="flex gap-10">
          {MediaType === "tv" && (
            <div className="relative  z-10" onClick={handleClick("tv")}>
              <button>Episodes</button>
              {tab === "tv" && (
                <span className="absolute -bottom-1 left-0 right-0  border-b-4 border-blue-500"></span>
              )}
            </div>
          )}
          <div
            className="relative z-10 pb-2"
            onClick={handleClick("suggestions")}
          >
            <button>Suggestions</button>
            {tab === "suggestions" && (
              <span className="absolute -bottom-1 left-0 right-0  border-b-4 border-blue-500"></span>
            )}
          </div>
        </div>
      </div>
      {tab === "tv" ? <Episodes></Episodes> : <Suggestions></Suggestions>}
    </div>
  );
}
