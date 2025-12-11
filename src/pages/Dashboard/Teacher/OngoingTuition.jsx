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
      console.log("data", result.data.result);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="mb-20">
      <h1 className="text-center font-bold my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        ONGOING TUITIONS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-15 py-5">
        {data.map(
          (tutor) =>
            tutor.Status === "Approved" && (
              <div
                key={tutor._id}
                className="card w-96 bg-base-100 card-lg shadow-sm"
              >
                <div className="card-body">
                  <h2 className="card-title">Name: {tutor.Name}</h2>
                  <p>Email: {tutor.Email}</p>
                  <p>Qualification: {tutor.Qualification}</p>
                  <p>Experience: {tutor.Experience}</p>
                  <p>Expected Salary: {tutor.Expected_Salary}</p>
                  <div className="card-actions">
                    <span className="btn bg-green-500 text-white">Approved</span>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default OngoingTuition;
