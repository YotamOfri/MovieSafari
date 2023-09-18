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
const AnimeInformation = lazy(() =>
  import("./pages/Anime/Information/Information")
);
// Paths
const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "Search", element: <Search /> },
      { path: "movie/:id", element: <Information type="movie" /> },
      { path: "tv/:id", element: <Information type="tv" /> },
    ],
  },
  {
    path: "/Anime",
    element: <Layout />,
    children: [
      { path: "", element: <AnimeHome /> },
      { path: "Search", element: <h1>Anime Search</h1> },
      { path: ":id", element: <AnimeInformation></AnimeInformation> },
    ],
  },
  {
    path: "movie/player/:id",
    element: <Player type="movie" />,
  },
  {
    path: "tv/player/:id",
    element: <Player type="tv" />,
  },
];
function MainRoutes() {
  const { isAuthorized, setIsAuthorized } = useAuthorization();
  const password = import.meta.env.VITE_PASSWORD;
  return (
    <>
      {isAuthorized === password ? (
        <Routes>
          {routeConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      ) : (
        <Login setIsAuthorized={setIsAuthorized} />
      )}
    </>
  );
}

export default MainRoutes;
