import { Route, Routes } from "react-router-dom";
import transition from "./transition";
import { lazy } from "react";
import Layout from "./Layout";
import { AnimatePresence } from "framer-motion";
import Player from "./pages/Modern/Player/Player";
import Search from "./pages/Search/SearchMain";
import useAuth from "./hooks/auth/useAuth";
import { WebsiteContext } from "./context/WebsiteContext";
import Login from "./pages/Auth/login/Login";
import Signup from "./pages/Auth/signup/Signup";

// Modern Section
const Home = lazy(() => import("./pages/Modern/Home/Home"));
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
      { path: "Search", element: <Search Type={"Modern"} /> },
      { path: "movie/:id", element: <Information type="movie" /> },
      { path: "tv/:id", element: <Information type="tv" /> },
    ],
  },
  {
    path: "/Anime",
    element: <Layout />,
    children: [
      { path: "", element: <AnimeHome /> },
      { path: "Search", element: <Search Type={"Anime"} /> },
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
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
];
function MainRoutes() {
  const { user, setUser } = useAuth();
  const Contextobject = { user, setUser };
  return (
    <>
      <WebsiteContext.Provider value={Contextobject}>
        <AnimatePresence mode="wait">
          <Routes>
            {routeConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={transition(
                        childRoute.element,
                        `${route.path}+${childIndex}`
                      )}
                    />
                  ))}
              </Route>
            ))}
          </Routes>
        </AnimatePresence>
      </WebsiteContext.Provider>
    </>
  );
}
export default MainRoutes;
