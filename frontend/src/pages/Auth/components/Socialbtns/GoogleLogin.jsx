import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import { useContext } from "react";
import { WebsiteContext } from "../../../../context/WebsiteContext";
import Google from "../../../../assets/icons/Google.svg";
export default function GoogleLogin({ setErrMesg }) {
  const { setUser } = useContext(WebsiteContext);
  const signIn = useGoogleLogin({
    onSuccess: (credentialResponse) => OnSuccess(credentialResponse),
  });
  const OnSuccess = async (res) => {
    const response = await fetch("http://localhost:3000/auth/google", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: res.access_token }),
    });
    if (response.status === 202) {
      const data = await response.json();
      if (data) {
        setUser(true);
        window.location.href = "/";
      } else setErrMesg("Error Loggin in with Google");
    } else {
      setErrMesg("Error Loggin in with Google");
    }
  };
  return (
    <div
      className="group relative h-14 w-[40%] cursor-pointer hover:bg-opacity-80 duration-300 ease-in-out rounded-lg bg-NiceBlack flex items-center justify-center"
      onClick={signIn}
    >
      <img
        src={Google}
        alt=""
        className="duration-300 ease-in-out group-hover:scale-95"
      />
    </div>
  );
}
GoogleLogin.propTypes = { setErrMesg: PropTypes.func.isRequired };
