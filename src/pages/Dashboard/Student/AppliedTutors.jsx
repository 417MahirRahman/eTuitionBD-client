import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";
import Loader from "../../../utilities/Loader";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const { user } = useContext(AuthContext);
  console.log("User:",user)
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
    return <Loader></Loader>;
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
    <div className="mb-20">
      <h1 className="text-center font-bold my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        Applied Tutors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-15 py-5">
        {data.map((tuition) => (
          <div
            key={tuition._id}
            className="card w-96 bg-base-100 card-lg shadow-sm"
          >
            <div className="card-body">
              <h2 className="card-title">Tutor Name: {tuition.Name}</h2>
              <p>Qualification: {tuition.Qualification}</p>
              <p>Experience: {tuition.Experience}</p>
              <p>Expected Salary: {tuition.Expected_Salary}</p>
              <div>
                {tuition.Status === "Pending" && (
                  <div className="card-actions">
                    <button
                      onClick={() => {
                        const paymentInfo = {
                          studentID: tuition.tuitionId,
                          studentEmail: user.email,
                          tutorID: tuition._id,
                          tutorEmail: tuition.Email,
                          tutorSalary: tuition.Expected_Salary,
                        };
                        handleApproveBtn(paymentInfo);
                      }}
                      className="btn btn-primary"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleRejectBtn(tuition._id);
                      }}
                      className="btn btn-primary"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {tuition.Status === "Rejected" && (
                  <button className="btn btn-primary">Rejected</button>
                )}
                {tuition.Status === "Approved" && (
                  <button className="btn btn-primary">Approved</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTutors;
