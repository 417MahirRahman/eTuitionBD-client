import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";
import Loader from "../../../utilities/Loader";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const { user } = useContext(AuthContext);
  console.log("User:", user);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const result = await axiosSecure(`/tuitionApplication/${user.email}`);
      setData(result.data.result);
      console.log("result", result.data.result);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader />;
  }

  //Handle Approve Button
  const handleApproveBtn = async (paymentInfo) => {
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  //Handle Reject Button
  const handleRejectBtn = (id) => {
    const formData = {
      Status: "Rejected",
    };
    axiosSecure.put(`/statusUpdate/${id}`, formData).then(() => {
      Swal.fire({
        title: "Updated!",
        text: "Status updated successfully.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {data.length === 0 ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-3xl md:text-4xl text-slate-600">
              No Tutor Applied Yet
            </p>
          </div>
        ) : (
          <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
            Applied Tutors
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    Tutor: {tuition.Name}
                  </h3>
                  <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                </div>
                <div className="space-y-3 text-slate-600">
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Qualification:
                    </span>
                    {tuition.Qualification}
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Experience:
                    </span>
                    {tuition.Experience}
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Expected Salary:
                    </span>
                    <span className="text-green-600 font-medium">
                      {tuition.Expected_Salary}
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  {tuition.Status === "Pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          const paymentInfo = {
                            studentID: tuition.tuitionId,
                            studentClass: tuition.Class,
                            studentEmail: user.email,
                            tutorID: tuition._id,
                            tutorEmail: tuition.Email,
                            tutorSalary: tuition.Expected_Salary,
                          };
                          handleApproveBtn(paymentInfo);
                        }}
                        className="flex-1 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg"
                      >
                        Approve
                      </button>
                      <button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleRejectBtn(tuition._id);
                        }}
                        className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {tuition.Status === "Rejected" && (
                    <button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl"
                      disabled
                    >
                      Rejected
                    </button>
                  )}
                  {tuition.Status === "Approved" && (
                    <button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl"
                      disabled
                    >
                      Approved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedTutors;
