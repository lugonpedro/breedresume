import NotFound from "@/pages/not-found";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages";
import AuthLayout from "./pages/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Experiences from "./pages/panel/experiences";
import Navbar from "./pages/panel/navbar";
import Skills from "./pages/panel/skills";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    element: <Navbar />,
    children: [
      {
        path: "experiences",
        element: <Experiences />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
    ],
  },
]);
