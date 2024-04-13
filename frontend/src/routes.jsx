import { Route, Routes } from "react-router-dom";
import transition from "./transition";
import { lazy, Suspense } from "react";
import Layout from "./Layout";
import { AnimatePresence } from "framer-motion";
import Player from "./pages/Modern/Player/Player";
import Search from "./pages/Search/SearchMain";
import useAuth from "./hooks/auth/useAuth";
import { WebsiteContext } from "./context/WebsiteContext";
import Login from "./pages/Auth/login/Login";
import Signup from "./pages/Auth/signup/Signup";
import { Toaster } from "@/components/ui/sonner";
import User from "./pages/User/User";
import MoviePlayer from "./pages/Modern/Player/MOVIE/MoviePlayer";
import TvPlayer from "./pages/Modern/Player/TV/TvPlayer";
import Loading from "./components/Animations/Loading";
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
      { path: "bookmarks", element: <User page={"bookmarks"} /> },
      { path: "profile", element: <User page={"profile"} /> },
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
  { path: "movie/player/:id", element: <MoviePlayer /> },
  { path: "tv/player/:id", element: <TvPlayer /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
];
function MainRoutes() {
  const { user, setUser, refreshUserInfo } = useAuth();
  const Contextobject = { user, setUser, refreshUserInfo };
  if (user === null) {
    console.log("Loading...");
    return (
      <div className="w-dvw h-dvh flex justify-center items-center">
        <Loading color={"stroke-white z-10"} size={"w-6 h-6"}></Loading>
      </div>
    );
  }
  return (
    <>
      <WebsiteContext.Provider value={Contextobject}>
        <AnimatePresence mode="wait" key={"mainPage"}>
          <Toaster />
          <Suspense fallback={<div>Loading...</div>} />
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
                        `${route.path}+${childIndex}+${childRoute.path}`
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
