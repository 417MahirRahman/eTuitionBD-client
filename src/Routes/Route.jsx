import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/Dashboard";
import Dashboard from "../layouts/Dashboard";
import PostNewTuition from "../pages/Dashboard/Student/PostNewTuition";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/tuitionPost",
        Component: PostNewTuition,
      }
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {

      }
    ]
  }
]);
