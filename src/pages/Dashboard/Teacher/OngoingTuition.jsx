import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";
import Loader from "../../../utilities/Loader";

const OngoingTuition = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const result = await axiosSecure(`/tutorApplication/${user.email}`);
      setData(result.data.result);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {data.filter(tutor => tutor.Status === "Approved").length === 0 ? (
          <div
            
            className="flex justify-center items-center min-h-96"
          >
            <p className="text-3xl md:text-4xl text-slate-600">No Ongoing Tuitions Found</p>
          </div>
        ) : (
          <h1
            
            className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800"
          >
            ONGOING TUITIONS
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((tutor) =>
            tutor.Status === "Approved" && (
              <div
                key={tutor._id}
                
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">Tuition Information</h3>
                    <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  </div>
                  <div className="space-y-3 text-slate-600">
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">Class:</span>
                      {tutor.Class}
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">Subjects:</span>
                      {tutor.Subjects}
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">Location:</span>
                      {tutor.Location}
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">Salary:</span>
                      <span className="text-green-600 font-medium">{tutor.Expected_Salary}</span>
                    </p>
                  </div>
                  <div className="mt-6">
                    <span
                      
                      className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl text-center"
                    >
                      Approved
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OngoingTuition;
