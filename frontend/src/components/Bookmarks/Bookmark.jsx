import { Link } from "react-router-dom";
import ImageLoad from "../imageLoad";
import { Trash, TvIcon } from "lucide-react";
export default function Bookmark({
  banner,
  title,
  type,
  subHeader,
  link,
  onRemove,
}) {
  const showType = type === "movie" ? "MV" : "TV";
  return (
    <div className="w-full h-14 overflow-hidden relative flex items-center px-2 justify-between">
      <ImageLoad
        src={banner}
        className="w-full h-14 left-0 rounded-md overflow-hidden opacity-55 absolute -z-10"
      />
      <div className="h-full flex items-center gap-3">
        <h1 className="w-5 text-zinc-400">{showType}</h1>
        <div className="h-3/5 w-[1.5px] bg-zinc-400"></div>
        <div>
          <h1 className="text-white font-semibold text-xl">{title}</h1>
          <h1 className="flex items-center text-xs text-white font-semibold">
            <span className="w-1 h-1 bg-white rounded-full mr-1"></span>
            {subHeader}
          </h1>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to={link}
          className="bg-NiceGray p-2 flex justify-center items-center rounded-md"
        >
          <TvIcon size={18} className="text-white z-10 " />
        </Link>
        <button
          className="bg-NiceGray cursor-pointer p-2 flex justify-center items-center rounded-md"
          onClick={onRemove}
        >
          <Trash size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}
