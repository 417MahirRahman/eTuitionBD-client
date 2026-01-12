import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../utilities/Loader";
import Swal from "sweetalert2";

const TuitionManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch Tuition Posts
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axiosSecure("/allTuitionPost");
        setData(Array.isArray(res.data) ? res.data : res.data?.result || []);
      } catch (err) {
        console.error("Error fetching tuition posts:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure]);

  if (loading) return <Loader />;

  // Update Tuition Status locally
  const updateStatus = async (id, status) => {
    try {
      const formData = { Status: status };
      await axiosSecure.put(`/postStatusUpdate/${id}`, formData);

      // Update state locally instead of full reload
      setData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, Status: status } : item
        )
      );

      Swal.fire({
        title: "Updated!",
        text: `Status updated to ${status} successfully.`,
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to update status",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {(!data || data.length === 0) ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-3xl md:text-4xl text-slate-600">
              No Tuition Requests Found
            </p>
          </div>
        ) : (
          <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
            TUITIONS REQUEST
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {(data || []).map((tuition) => (
            <div
              key={tuition._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    Class: {tuition.Class || "-"}
                  </h3>
                  <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                </div>

                <div className="space-y-3 text-slate-600">
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Subjects:
                    </span>
                    {tuition.Subjects || "-"}
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Budget:
                    </span>
                    <span className="text-green-600 font-medium">
                      {tuition.Budget || 0}
                    </span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Location:
                    </span>
                    {tuition.Location || "-"}
                  </p>
                </div>

                <div className="mt-6">
                  {tuition.Status === "Pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateStatus(tuition._id, "Approved")}
                        className="flex-1 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(tuition._id, "Rejected")}
                        className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {tuition.Status === "Rejected" && (
                    <button
                      className="w-full bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl"
                      disabled
                    >
                      Rejected
                    </button>
                  )}
                  {tuition.Status === "Approved" && (
                    <button
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

export default TuitionManagement;
