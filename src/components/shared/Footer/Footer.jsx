import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal font-semibold bg-slate-900 text-slate-400 p-10">
        <aside>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">eTuitionBD</span>
          </div>
          <p>
            Providing reliable services since 2020
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-white mb-3">Quick Links</h6>
          <a className="link link-hover text-slate-400 hover:text-blue-400 transition-colors">About us</a>
          <a className="link link-hover text-slate-400 hover:text-blue-400 transition-colors">Terms of use</a>
          <a className="link link-hover text-slate-400 hover:text-blue-400 transition-colors">Privacy policy</a>
        </nav>
        <nav>
          <h6 className="footer-title text-white mb-3">Social Links</h6>
          <div className="flex space-x-4">
            <a className="text-slate-400 hover:text-white transition-colors hover:cursor-pointer">
              <FaSquareXTwitter size={24} />
            </a>
            <a className="text-slate-400 hover:text-red-500 transition-colors hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a className="text-slate-400 hover:text-blue-600 transition-colors hover:cursor-pointer">
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
          <h6 id="Contact" className="footer-title text-white mb-3">Contact</h6>
          <a className="link link-hover text-slate-400 hover:text-blue-400 transition-colors">Email: eTuitionBD@gmail.com</a>
          <a className="link link-hover text-slate-400 hover:text-blue-400 transition-colors">Phone: 01234567890</a>
        </nav>
      </footer>

      <footer className="footer sm:footer-horizontal footer-center font-medium bg-slate-800 text-slate-400 p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by eTuitionBD
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
