import { Link } from "react-router-dom";
export function MobileMenu() {
  return (
    <ul className="flex-col gap-4 flex sm:hidden h-fit">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/movies"}>Movies</Link>
      </li>
      <li>
        <Link to={"/shows"}>Shows</Link>
      </li>
      <li>
        <Link to={"/shows"}>Account</Link>
      </li>
    </ul>
  );
}
