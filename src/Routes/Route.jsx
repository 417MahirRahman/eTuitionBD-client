import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/Dashboard";
import Dashboard from "../layouts/Dashboard";
import PostNewTuition from "../pages/Dashboard/Student/PostNewTuition";
import Tuition from "../pages/All_Tuition/Tuition";
import All_Tuition from "../pages/All_Tuition/All_Tuition";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";
import PrivateRoute from "./PrivateRoute";

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
        path: "/all-tuition",
        Component: Tuition,
        children: [
          {
            index: true,
            Component: All_Tuition,
          },
          {
            path: ":id",
            element: (
              <PrivateRoute>
                <TuitionDetails></TuitionDetails>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/tuitionPost",
        Component: PostNewTuition,
      },
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
    children: [{}],
  },
]);
