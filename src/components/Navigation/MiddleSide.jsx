import { Link } from "react-router-dom";

export function MiddleSide() {
  return (
    <ul className="h-full flex items-center gap-8">
      <li className="border-b-2 border-white hover:border-yellow-300 transition-colors">
        <Link
          to={"/"}
          className="text-xl font-semibold text-white hover:text-yellow-300 transition-colors"
        >
          Home
        </Link>
      </li>
    </ul>
  );
}
