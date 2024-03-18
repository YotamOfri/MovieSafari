import { useState } from "react";
import PropTypes from "prop-types";
export default function UserRegister({ setPage }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold">Register</h1>
      <div className="w-full flex flex-col items-center gap-10">
        <div
          id="input-container"
          className="relative sm:w-80 w-[90%] child:duration-300 child:ease-in-out"
        >
          <input
            type="text"
            placeholder=""
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            id="username"
            className="bg-slate-900 outline-none sm:w-80 w-full h-10 px-2"
          />
          <label
            htmlFor="passowrd"
            className="absolute text-sm top-[9px] left-2 pointer-events-none"
          >
            Username
          </label>
        </div>
        <div
          id="input-container"
          className="relative sm:w-80 w-[90%] child:duration-300 child:ease-in-out"
        >
          <input
            type="email"
            placeholder=""
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="email"
            className="bg-slate-900 outline-none sm:w-80 w-full h-10 px-2"
          />
          <label
            htmlFor="email"
            className="absolute text-sm top-[9px] left-2 pointer-events-none"
          >
            Email
          </label>
        </div>
        <div
          id="input-container"
          className="relative sm:w-80 w-[90%] child:duration-300 child:ease-in-out"
        >
          <input
            type="password"
            placeholder=""
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            id="password"
            className="bg-slate-900 outline-none sm:w-80 w-full h-10 px-2"
          />
          <label
            htmlFor="passowrd"
            className="absolute text-sm top-[9px] left-2 pointer-events-none"
          >
            Password
          </label>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-1">
        <button className="w-60 h-11 rounded-xl bg-slate-900 duration-300 ease-in-out hover:scale-[1.02] active:opacity-70 ">
          Register
        </button>
        <div className="flex gap-2 text-slate-300 child-hover:text-slate-500 child:duration-300 child:ease-in-out child:text-sm">
          <button onClick={() => setPage(1)}>Login</button>
          <button>Forgot Password?</button>
        </div>
      </div>
    </div>
  );
}
UserRegister.propTypes = {
  setPage: PropTypes.func,
};
