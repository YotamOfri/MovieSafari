import { RightArrowSVG } from "../../../components/AdvancedIcons/RightArrowSVG";
import Logo from "../../../assets/Logo.svg";
import { Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import { BackgroundBeams } from "../../../components/Authentication/Background";
export default function Signup() {
  return (
    <div className="w-full h-[100dvh] min-h-[700px] flex justify-center items-center relative bg-no-repeat bg-center bg-cover background-overlay bg-opacity-20">
      <BackgroundBeams></BackgroundBeams>
      <div className="relative sm:w-[480px] sm:h-[660px] p-10 w-full h-full bg-secondBg text-white items-centerrounded-xl flex flex-col gap-4 child:w-full duration-500 ease-in-out border border-slate-600">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to={"/"} className="flex gap-1 items-end justify-center">
            <img src={Logo} className="w-8" alt="" />
            <h1 className="text-lg font-bold">MovieSafaris</h1>
          </Link>
        </div>
        {/* Header */}
        <div className="flex flex-col gap-1 pb-4">
          <h1 className="font-bold text-2xl">Sign up</h1>
          <h2 className="text-sm text-gray-300">Register to MovieSafaris</h2>
        </div>
        {/* Inputs */}
        <SignupForm></SignupForm>
        {/* Register */}
        <div className="flex gap-1 text-sm group">
          <h1>Already have an account?</h1>
          <span className="text-secondary group-hover:text-indigo-500 duration-200 ease-in-out">
            <Link to={"/login"} className="flex gap-1 items-center">
              Login
              <RightArrowSVG
                fill={"#4f46e5"}
                className={"group-hover:ml-[2px] duration-300 ease-in-out"}
              ></RightArrowSVG>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
