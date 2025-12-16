import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../utilities/Loader";
import { Link } from "react-router";

const All_Tutor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const role = "tutor" 
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const loadData = async () => {
      const result = await axiosSecure(`/dynamicTutorPost/${role}`);
      setData(result.data);
      console.log("data:", result.data);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, role]);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-bold my-8 lg:my-12 text-3xl md:text-4xl lg:text-5xl text-slate-800">
          Our New Tutors
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
            >
              <div className="p-6">
                <div>
                  <img src="" alt="" />
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    Name: {tutor.name}
                  </h3>
                  <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                </div>
                <div className="space-y-3 text-slate-600">
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Email:
                    </span>
                    {tutor.email}
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Phone Number:
                    </span>
                    <span className="text-green-600 font-medium">
                      {tutor.phoneNumber}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default All_Tutor;
