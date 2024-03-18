import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { Suspense } from "react";
export default function Layout() {
  return (
    <>
      <Navigation></Navigation>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </>
  );
}
