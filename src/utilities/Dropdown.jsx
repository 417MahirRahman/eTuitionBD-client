import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../providers/AuthContext";
import { toast, Bounce } from "react-toastify";
import { Link, NavLink } from "react-router";
import { User, LayoutDashboard, LogOut } from "lucide-react";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Dropdown = () => {
  const { user, logOut } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();

  useEffect(() => {
    const loadData = async () => {
      const result = await axiosSecure(`/users/${user.email}`);
      setData(result.data.result);
      console.log("data:", result.data.result);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader></Loader>;
  }

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
            src={data?.Image_URL || "https://i.ibb.co.com/WWfZbmXY/12.png"}
            alt=""
          />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
          <li>
            <NavLink
              to={"/profileSettings"}
              className="flex items-center gap-3 text-black font-bold"
            >
              <User className="w-4 h-4" />
              Profile
            </NavLink>
          </li>

          {/* Demo-User */}
          {role === "demo" && (
            <li>
              <NavLink
                to={"/dashboard/reportAnalytics"}
                className="flex items-center gap-3 text-black font-bold"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>
            </li>
          )}

          {/* student */}
          {role === "student" && (
            <li>
              <NavLink
                to={"/dashboard/myTuitions"}
                className="flex items-center gap-3 text-black font-bold"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>
            </li>
          )}

          {/* Teacher */}
          {role === "tutor" && (
            <li>
              <NavLink
                to={"/dashboard/myApplication"}
                className="flex items-center gap-3 text-black font-bold"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>
            </li>
          )}

          {/* Admin */}
          {role === "admin" && (
            <li>
              <NavLink
                to={"/dashboard/reportAnalytics"}
                className="flex items-center gap-3 text-black font-bold"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <Link
              onClick={handleLogOut}
              to={"/login"}
              className="flex items-center gap-3 font-bold text-black"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Link>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default Dropdown;
