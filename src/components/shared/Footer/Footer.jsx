import React from "react";
import logo from "../../../assets/logo-white.png";
import { Link } from "react-router";
import { Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal font-semibold bg-slate-900 text-slate-400 p-10">
        <aside>
          <div className="flex items-center space-x-2 mb-2">
            <img className="size-12" src={logo} alt="" />
            <span className="text-xl font-bold text-white">
              <span>eTui</span>
              <span className="text-blue-600">tionBD</span>
            </span>
          </div>
          <p>Providing reliable services since 2020</p>
        </aside>
        <nav>
          <h6 className="footer-title text-white mb-3">Quick Links</h6>
          <Link
            to={"/all-tuition"}
            className="link link-hover text-slate-400 hover:text-blue-400 transition-colors"
          >
            All-Tuition
          </Link>
          <Link
            to={"/all-tutor"}
            className="link link-hover text-slate-400 hover:text-blue-400 transition-colors"
          >
            All-Tutor
          </Link>
          <Link
            to={"/aboutUs"}
            className="link link-hover text-slate-400 hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="link link-hover text-slate-400 hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title text-white mb-3">Social Links</h6>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/17mefazur-rahman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/417MahirRahman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/mahir.rahman.180624"
              className="text-slate-400 hover:text-blue-600 transition-colors hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <nav>
          <h6 id="Contact" className="footer-title text-white mb-3">
            Contact
          </h6>
          <a className="link link-hover text-slate-400 hover:text-blue-400">
            Email: 35mahirrahman@gmail.com
          </a>
          <a className="link link-hover text-slate-400 hover:text-blue-400">
            Phone: 01880821924
          </a>
        </nav>
      </footer>

      <footer className="footer sm:footer-horizontal footer-center font-medium bg-slate-800 text-slate-400 p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            eTuitionBD
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
