import { useEffect, useRef, useState, useContext } from "react";
import { WebsiteContext } from "../../../../context/websiteContext";
import { Blackinput } from "../../../../components/Inputs/Blackinput";
import Seperator from "../../components/Seperator";
import Socialbtns from "../../components/Socialbtns/Socialbtns";
import SubmitButton from "../../components/SubmitButton";
import login from "../../../../hooks/auth/login";
import { useMutation } from "@tanstack/react-query";
export default function Loginform() {
  const { setUser } = useContext(WebsiteContext);
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMesg] = useState("");
  const { mutate, data, isSuccess, isError, error, isPending } = useMutation({
    mutationFn: login,
  });
  // submit
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMesg("");
  }, [email, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com"))
      return setErrMesg("Please enter a valid email address.");
    if (password.length <= 5)
      return setErrMesg("Please enter a valid password.");
    const User = { email: email, password: password };
    mutate(User);
  };
  // check Error
  useEffect(() => {
    if (!isError) return;
    const status = error.response?.status;
    if (!status) return setErrMesg("server error.");
    if (status === 401) return setErrMesg("Invalid email or password.");
    if (status === 429)
      return setErrMesg("Exceeded login attempts. Try again later.");
  }, [isError]);
  useEffect(() => {
    if (!isSuccess) return;
    if (data) {
      setUser(true);
      window.location.href = "/";
    }
  }, [isSuccess]);
  return (
    <form className="flex flex-col gap-4">
      {/* Inputs */}
      <div className="flex flex-col gap-4  justify-center child:w-full">
        <Blackinput
          title={"Email"}
          type={"email"}
          value={email}
          setValue={setEmail}
          ref={userRef}
        ></Blackinput>
        <Blackinput
          title={"Password"}
          type={"password"}
          value={password}
          setValue={setPassword}
        ></Blackinput>
      </div>
      {/* Error Message */}
      <p ref={errRef} aria-live="assertive" className="text-red-500 text-xs">
        {errMsg}
      </p>
      {/* Submit */}
      <SubmitButton
        onClick={handleSubmit}
        text={"Continue with email"}
        isPending={isPending}
      ></SubmitButton>
      {/* Seperator */}
      <Seperator></Seperator>
      {/* Login Optios */}
      <Socialbtns setErrMesg={setErrMesg}></Socialbtns>
    </form>
  );
}
