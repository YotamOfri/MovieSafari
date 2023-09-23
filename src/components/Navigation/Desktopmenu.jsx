import { Link, useLocation } from "react-router-dom";
export default function Desktopmenu() {
  const location = useLocation();
  return (
    <div className="w-1/3 md:flex hidden items-center justify-center space-x-8">
      <Link
        to={"/"}
        className={`text-lg hover:text-blue-400 duration-300 ease-in-out ${
          !location.pathname.includes("Anime") &&
          !location.pathname.includes("Search")
            ? "border-b-2 border-blue-400"
            : ""
        }`}
      >
        Home
      </Link>
      <Link
        to={"/Anime"}
        className={`text-lg hover:text-blue-400 duration-300 ease-in-out ${
          location.pathname.includes("Anime") &&
          !location.pathname.includes("Search")
            ? "border-b-2 border-blue-400"
            : ""
        }`}
      >
        Anime
      </Link>
    </div>
  );
}
