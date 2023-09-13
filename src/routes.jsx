import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "./Layout";
import { useAuthorization } from "./utils/authUtils";
import Player from "./pages/Modern/Player/Player";
// LogIn
const Login = lazy(() => import("./pages/Login/Login"));
// Modern Section
const Home = lazy(() => import("./pages/Modern/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));

const Information = lazy(() =>
  import("./pages/Modern/Information/information")
);
// Anime
const AnimeHome = lazy(() => import("./pages/Anime/home/Home"));
function MainRoutes() {
  const { isAuthorized, setIsAuthorized } = useAuthorization();
  const passwod = import.meta.env.VITE_PASSWORD;
  return (
    <>
      {isAuthorized === passwod ? (
        <>
          <Routes>
            <Route path="/" element={<Layout></Layout>}>
              <Route index element={<Home></Home>}></Route>
              <Route path="Search" element={<Search></Search>} />
              <Route
                path="movie/:id"
                element={<Information type={"movie"}></Information>}
              ></Route>
              <Route
                path="tv/:id"
                element={<Information type={"tv"}></Information>}
              ></Route>
            </Route>
            <Route path="/Anime" element={<Layout></Layout>}>
              <Route index element={<AnimeHome></AnimeHome>} />
            </Route>
            <Route
              path="movie/player/:id"
              element={<Player type={"movie"}></Player>}
            ></Route>
            <Route
              path="tv/player/:id"
              element={<Player type={"tv"}></Player>}
            ></Route>
          </Routes>
        </>
      ) : (
        <Login setIsAuthorized={setIsAuthorized}></Login>
      )}
    </>
  );
}

export default MainRoutes;
