import GoogleLogin from "./GoogleLogin";
import PropTypes from "prop-types";
import Facebooklogin from "./FacebookLogin";
export default function Socialbtns({ setErrMesg }) {
  return (
    <div className="flex justify-center items-center gap-5">
      <Facebooklogin setErrMesg={setErrMesg}></Facebooklogin>
      <GoogleLogin setErrMesg={setErrMesg}></GoogleLogin>
    </div>
  );
}
Socialbtns.propTypes = { setErrMesg: PropTypes.func.isRequired };
