import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../utilities/Loader";
import { Link } from "react-router";
import Swal from "sweetalert2";

const TuitionManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure("/allTuitionPost").then((res) => {
      setData(res.data);
      console.log("data", res.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  if (loading) {
    return <Loader></Loader>;
  }

  //Handle Reject Button
  const handleApproveBtn = (id) => {
    const formData = {
      Status: "Approved",
    };
    axiosSecure.put(`/postStatusUpdate/${id}`, formData).then(() => {
      Swal.fire({
        title: "Updated!",
        text: "Status updated successfully.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    });
  };

  //Handle Reject Button
  const handleRejectBtn = (id) => {
    const formData = {
      Status: "Rejected",
    };
    axiosSecure.put(`/postStatusUpdate/${id}`, formData).then(() => {
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
        TUITIONS REQUEST
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-15 py-5">
        {data.map((tuition) => (
          <div
            key={tuition._id}
            className="card w-96 bg-base-100 card-lg shadow-sm"
          >
            <div className="card-body">
              <h2 className="card-title">Class: {tuition.Class}</h2>
              <p>Subjects: {tuition.Subjects}</p>
              <p>Budget: {tuition.Budget}</p>
              <p>Location: {tuition.Location}</p>
              <div className="card-actions">
                {tuition.Status === "Pending" && (
                  <div className="card-actions">
                    <button
                      onClick={() => {
                        handleApproveBtn(tuition._id);
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

export default TuitionManagement;
