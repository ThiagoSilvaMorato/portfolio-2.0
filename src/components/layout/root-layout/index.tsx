import { Outlet } from "react-router-dom";
import { SiteNav } from "../site-nav";

export function RootLayout() {
  return (
    <>
      <SiteNav />
      <Outlet />
    </>
  );
}
