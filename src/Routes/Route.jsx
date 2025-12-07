import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: '/',
        Component: Home
      }
    ]
  },
  {
    path: 'login',
    Component: Login
  }
]);