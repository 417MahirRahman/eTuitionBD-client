import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PostNewTuition from "../pages/Dashboard/Student/PostNewTuition";
import Tuition from "../pages/All_Tuition/Tuition";
import All_Tuition from "../pages/All_Tuition/All_Tuition";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import MyApplication from "../pages/Dashboard/Teacher/MyApplication";
import OngoingTuition from "../pages/Dashboard/Teacher/OngoingTuition";
import RevenueHistory from "../pages/Dashboard/Teacher/RevenueHistory";
import MyTuitions from "../pages/Dashboard/Student/MyTuitions";
import AppliedTutors from "../pages/Dashboard/Student/AppliedTutors";

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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      //-----Student Pages Start-----\\
      {
        path: "/dashboard/myTuitions",
        element: <StudentRoute>
          <MyTuitions></MyTuitions>
        </StudentRoute>
      },
      {
        path: "/dashboard/tuitionPost",
        element: (
          <StudentRoute>
            <PostNewTuition></PostNewTuition>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/appliedTutors",
        element: <StudentRoute>
          <AppliedTutors></AppliedTutors>
        </StudentRoute>
      },
      {
        path: "/dashboard/payments"
      },
      {
        path: "/dashboard/profileSettings"
      },
      //-----Student Pages End-----\\

      //-----Tutor Pages Start-----\\
      {
        path: "/dashboard/myApplication",
        element: (
          <TutorRoute>
            <MyApplication></MyApplication>
          </TutorRoute>
        ),
      },
      {
        path: "/dashboard/onGoingTuition",
        element: (
          <TutorRoute>
            <OngoingTuition></OngoingTuition>
          </TutorRoute>
        ),
      },
      {
        path: "/dashboard/revenueHistory",
        element: (
          <TutorRoute>
            <RevenueHistory></RevenueHistory>
          </TutorRoute>
        ),
      },
      //-----Tutor Pages End-----\\
    ],
  },
]);
