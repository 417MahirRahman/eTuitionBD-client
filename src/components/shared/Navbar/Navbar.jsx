import React from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../../../providers/AuthContext";
import Dropdown from "../../../utilities/Dropdown";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const activeStyle = "font-semibold text-xl text-blue-600";
  const normalStyle = "font-semibold text-lg hover:text-blue-600";
  const links = (
    <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-8 text-lg">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        Home
      </NavLink>
      <NavLink
        to={"/all-tuition"}
        className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        Tuitions
      </NavLink>
      <NavLink
        to={"/all-tutor"}
        className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        Tutors
      </NavLink>
      <NavLink className={normalStyle}>Contact</NavLink>
      <NavLink className={normalStyle}>About</NavLink>
    </div>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-white/80 backdrop-blur-sm border-b border-slate-200 text-slate-800 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-slate-200"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <a className="btn btn-ghost text-xl font-bold text-slate-800">
              eTuitionBD
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              <Dropdown />
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-lg bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full border-none hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
