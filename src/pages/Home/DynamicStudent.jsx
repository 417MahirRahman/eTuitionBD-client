import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../utilities/Loader";
import { Link } from "react-router";

const DynamicStudent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const loadData = async () => {
      const result = await axiosSecure("/dynamicTuitionPost");
      setData(result.data);
      console.log("data:", result.data);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-bold my-8 lg:my-12 text-3xl md:text-4xl lg:text-5xl text-slate-800">
          New Tuition Post
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map(
            (tuition) =>
              tuition.Status === "Approved" && (
                <div
                  key={tuition._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">
                        Class: {tuition.Class}
                      </h3>
                      <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                    <div className="space-y-3 text-slate-600">
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Subjects:
                        </span>
                        {tuition.Subjects}
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Budget:
                        </span>
                        <span className="text-green-600 font-medium">
                          {tuition.Budget}
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Location:
                        </span>
                        {tuition.Location}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/all-tuition/${tuition._id}`}
                        className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg block text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <Link
        className="w-1/10 mx-auto my-15 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg block text-center"
        to={"/all-tuition"}
      >
        View All Tuition
      </Link>
    </div>
  );
};

export default DynamicStudent;
