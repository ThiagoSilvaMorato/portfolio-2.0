import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/components/layout/root-layout";
import { About } from "@/pages/About";
import { Chat } from "@/pages/Chat";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { Projects } from "@/pages/Projects";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "chat", Component: Chat },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
