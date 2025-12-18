import React from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../../../providers/AuthContext";
import Dropdown from "../../../utilities/Dropdown";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const activeStyle = "font-semibold text-2xl text-blue-600";
  const normalStyle = "font-semibold text-xl hover:text-blue-600";
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
      <NavLink
        to={"/contact"}
        className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        Contact
      </NavLink>
      <NavLink
        to={"/aboutUs"}
        className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        About
      </NavLink>
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
          <div className="flex items-center justify-center ml-10">
            <img className="size-25" src={logo} alt="" />
            <Link
              to={"/"}
              className="text-3xl -ml-2 font-bold text-slate-800 hover:cursor-pointer"
            >
              <span>eTui</span>
              <span className="text-blue-600">tionBD</span>
            </Link>
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
