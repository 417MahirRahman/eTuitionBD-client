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
import PaymentSuccess from "../pages/Dashboard/Student/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory";
import MyProfile from "../pages/My Profile/MyProfile";
import AdminRoute from "./AdminRoute";
import UsersManagement from "../pages/Dashboard/Admin/UsersManagement";
import TuitionManagement from "../pages/Dashboard/Admin/TuitionManagement";
import Reports_and_Analytics from "../pages/Dashboard/Admin/Reports_and_Analytics";
import All_Tutor from "../pages/All_Tutor/All_Tutor";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import TuitionPostNotFound from "../pages/ErrorPage/TuitionPostNotFound";
import Contact from "../pages/Contact Page/Contact";
import AboutUs from "../pages/About Us/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
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
            element: <TuitionDetails></TuitionDetails>,
          },
        ],
      },
      {
        path: "/all-tutor",
        element: <All_Tutor></All_Tutor>,
      },
      {
        path: "/profileSettings",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/aboutUs",
        Component: AboutUs,
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
        path: "/tuitionPostNotFound",
        Component: TuitionPostNotFound,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      //-----Admin Pages Start-----\\
      {
        path: "/dashboard/reportAnalytics",
        element: (
          <AdminRoute>
            <Reports_and_Analytics></Reports_and_Analytics>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/usersManagement",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/tuitionManagement",
        element: (
          <AdminRoute>
            <TuitionManagement></TuitionManagement>
          </AdminRoute>
        ),
      },
      //-----Admin Pages End-----\\

      //-----Student Pages Start-----\\
      {
        path: "/dashboard/myTuitions",
        element: (
          <StudentRoute>
            <MyTuitions></MyTuitions>
          </StudentRoute>
        ),
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
        element: (
          <StudentRoute>
            <AppliedTutors></AppliedTutors>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <StudentRoute>
            <PaymentHistory></PaymentHistory>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/paymentSuccess",
        element: (
          <StudentRoute>
            <PaymentSuccess></PaymentSuccess>
          </StudentRoute>
        ),
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
