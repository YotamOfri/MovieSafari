import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./components/Home/HomePage";
import { Navigation } from "./components/Navigation/Navigation";
import { useState, useEffect } from "react";
import { EnterPage } from "./components/EnterPagePassword/EnterPage";
import { InformationPage } from "./components/InformationPage/InformationPage";
import { FramePlayer } from "./components/ApiPlayer/FramePlayer";
import { FramePlayerTV } from "./components/ApiPlayer/FramePlayerTV";
import { LoadingPage } from "./components/LoadingPage";
function App() {
  const storedPassword = localStorage.getItem("password");
  const [isAuthorized, setIsAuthorized] = useState(storedPassword);
  const [loading, setIsLoading] = useState(true);
  const password = import.meta.env.VITE_PASSWORD;
  const location = useLocation();
  const isPlayerRoute = location.pathname.includes("/player");
  // When isAuthorized changes, update local storage
  useEffect(() => {
    if (isAuthorized) {
      localStorage.setItem("password", isAuthorized);
    } else {
      localStorage.removeItem("password");
    }
  }, [isAuthorized]);

  return (
    <div
      className={`relative bg-mainbg text-white font-roboto  sm:h-full sm:min-h-fit overflow-x-hidden  ${
        !isPlayerRoute && "sm:h-fit min-h-[950px]"
      } `}
    >
      {loading && <LoadingPage setIsLoading={setIsLoading}></LoadingPage>}
      {isAuthorized === password && !isPlayerRoute && <Navigation />}
      {isAuthorized === password && (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<h1>Hello</h1>} />
            <Route path="/tv" element={<h1>Hello</h1>} />
            <Route path="/movie/player/:id" element={<FramePlayer />} />
            <Route path="/movie/:id" element={<InformationPage />} />
            <Route path="/tv/:id" element={<InformationPage />} />
            <Route
              path="/tv/player/:id"
              element={<FramePlayerTV></FramePlayerTV>}
            />
          </Routes>
        </>
      )}
      {isAuthorized !== password && (
        <EnterPage setIsAuthorized={setIsAuthorized} />
      )}
    </div>
  );
}

export default App;
