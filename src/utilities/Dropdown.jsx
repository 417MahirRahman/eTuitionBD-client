import React, { useContext } from "react";
import AuthContext from "../providers/AuthContext";
import { toast, Bounce } from "react-toastify";
import { Link, NavLink } from "react-router";
import { User, LayoutDashboard, LogOut } from "lucide-react";
import useRole from "../hooks/useRole";

const Dropdown = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role] = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        const msg = error.message;
        toast.error(`${msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };
  return (
    <div>
      <details className="dropdown dropdown-bottom dropdown-end">
        <summary className="border w-10 avatar rounded-full m-1">
          <img
            className="rounded-full avatar"
            src={user.photoURL ? user.photoURL : "ProfilePic"}
            alt=""
          />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
          <li className="flex gap-1">
            <div>
              <User />
              <NavLink to={"/profileSettings"} className="text-black font-bold">
                Profile
              </NavLink>
            </div>
          </li>
          <li className="flex gap-1">
            <div>
              <LayoutDashboard />
              {/* student */}
              {role === "student" && (
                <NavLink
                  to={"/dashboard/myTuitions"}
                  className="text-black font-bold"
                >
                  Dashboard
                </NavLink>
              )}

              {/* Teacher */}
              {role === "tutor" && (
                <NavLink
                  to={"/dashboard/myApplication"}
                  className="text-black font-bold"
                >
                  Dashboard
                </NavLink>
              )}
              
              {/* Admin */}
              {role === "admin" && (
                <NavLink
                  to={"/dashboard/reportAnalytics"}
                  className="text-black font-bold"
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          </li>
          <li className="flex gap-1">
            <div>
              <LogOut />
              <Link
                onClick={handleLogOut}
                to={"/login"}
                className="font-bold text-black"
              >
                Log Out
              </Link>
            </div>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default Dropdown;
