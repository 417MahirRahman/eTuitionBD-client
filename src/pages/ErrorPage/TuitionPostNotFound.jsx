import React from "react";
import { Link } from "react-router";
import { Home, Search } from "lucide-react";
const TuitionPostNotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-6xl font-bold text-blue-600 mb-2">404</h1>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to={"/all-tuition"}
          className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back
        </Link>
      </div>
    </div>
  );
};

export default TuitionPostNotFound;
