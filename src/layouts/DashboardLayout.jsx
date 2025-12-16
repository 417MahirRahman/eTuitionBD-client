import { Link, Outlet } from "react-router";
import TutorDashboardPage from "../pages/Dashboard/Teacher/TutorDashboardPage";
import useRole from "../hooks/useRole";
import StudentDashboardPage from "../pages/Dashboard/Student/StudentDashboardPage";
import AdminDashboardPage from "../pages/Dashboard/Admin/AdminDashboardPage";

const DashboardLayout = () => {
  const [role] = useRole();

  return (
    <div
      data-theme="light"
      className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 to-blue-50"
    >
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4 text-slate-700"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>

            {/* Navbar Title */}
            {role === "student" && (
              <h1 className="px-5 py-5 text-3xl text-center w-full text-slate-800 font-bold">
                Student Dashboard
              </h1>
            )}

            {role === "tutor" && (
              <h1 className="px-5 py-5 text-3xl text-center w-full text-slate-800 font-bold">
                Tutor Dashboard
              </h1>
            )}

            {role === "admin" && (
              <h1 className="px-5 py-5 text-3xl text-center w-full text-slate-800 font-bold">
                Admin Dashboard
              </h1>
            )}
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-slate-800 text-white is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-slate-700"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>
              {role === "admin" && <AdminDashboardPage></AdminDashboardPage>}

              {role === "tutor" && <TutorDashboardPage></TutorDashboardPage>}

              {role === "student" && (
                <StudentDashboardPage></StudentDashboardPage>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
