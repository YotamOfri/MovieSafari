import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
export function LeftSide() {
  return (
    <>
      <Link to={"/"} className="flex items-center h-full w-fit gap-2">
        <img src={Logo} className="lg:w-auto lg:h-auto  h-10 w-10" alt="" />
        <h1 className="lg:text-2xl sm:text-base font-roboto font-bold tracking-wider">
          MovieSafari
        </h1>
      </Link>
    </>
  );
}
