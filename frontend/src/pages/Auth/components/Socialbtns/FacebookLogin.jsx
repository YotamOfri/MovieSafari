import FacebookLogin from "@greatsumini/react-facebook-login";
import Facebook from "../../../../assets/icons/facebook.svg";
import { useContext } from "react";
import { WebsiteContext } from "../../../../context/WebsiteContext";
export default function Facebooklogin({ setErrMesg }) {
  const { setUser } = useContext(WebsiteContext);
  const onSuccess = async (res) => {
    const Facebookresponse = await fetch(
      `https://graph.facebook.com/${res.userID}?fields=id,name,email,picture&access_token=${res.accessToken}`
    );
    const data = await Facebookresponse.json();
    const response = await fetch("http://localhost:3000/auth/facebook", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (response.status === 202) {
      const data = await response.json();
      if (data) {
        setUser(true);
        window.location.href = "/";
      } else setErrMesg("Error Loggin in with Facebook");
    } else setErrMesg("Error Loggin in with Facebook");
  };
  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      className="group relative h-14 w-[40%] cursor-pointer hover:bg-opacity-80 duration-300 ease-in-out rounded-lg bg-NiceBlack flex items-center justify-center"
      onSuccess={(response) => {
        onSuccess(response);
      }}
      loginOptions={{
        return_scopes: true,
      }}
    >
      <img
        src={Facebook}
        alt=""
        className="duration-300 ease-in-out group-hover:scale-95"
      />
    </FacebookLogin>
  );
}
