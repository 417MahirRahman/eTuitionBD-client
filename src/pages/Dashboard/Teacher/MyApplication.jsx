import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../providers/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../../../utilities/Loader";

const MyApplication = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //FETCH DATA
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/tutorApplication/${user.email}`).then((res) => {
      setData(res.data.result);
      console.log(res.data.result);
      setLoading(false);
    });
  }, [axiosSecure, user.email]);

  if (loading) return <Loader />;

  //OPEN MODAL
  const openModal = (app) => {
    setSelectedApp(app);
    reset(app);
    document.getElementById("update_modal").showModal();
  };

  //UPDATE
  const handleUpdate = async (formData) => {
    try {
      await axiosSecure.put(`/tutorApplication/${selectedApp._id}`, formData);

      setData((prev) =>
        prev.map((item) =>
          item._id === selectedApp._id ? { ...item, ...formData } : item
        )
      );
      document.getElementById("update_modal").close();
      setSelectedApp(null);
      Swal.fire("Updated!", "Application updated successfully", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/tutorApplication/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
      Swal.fire("Deleted!", "Application removed", "success");
    }
  };

  const pendingApplications = data.filter((app) => app.Status === "Pending");

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {pendingApplications.length === 0 ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-3xl text-center md:text-4xl text-slate-600">
              No Pending Applications Found
            </p>
          </div>
        ) : (
          <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
            MY APPLICATIONS
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pendingApplications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    Tuition Information
                  </h3>
                  <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                </div>
                <div className="space-y-3 text-slate-600">
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Class:
                    </span>
                    {app.Class}
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Subjects:
                    </span>
                    {app.Subjects}
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Budget:
                    </span>
                    <span className="text-green-600 font-medium">
                      {app.Budget}
                    </span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold text-slate-700 mr-2">
                      Location:
                    </span>
                    <span>{app.Location}</span>
                  </p>
                  {/* Tutor Info */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      Information you have given
                    </h3>
                    <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  </div>
                  <div className="space-y-3 text-slate-600">
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Name:
                      </span>
                      <span>{app.Name}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Qualification:
                      </span>
                      <span>{app.Qualification}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Experience:
                      </span>
                      <span>{app.Experience}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Your Expected Salary:
                      </span>
                      <span className="text-green-600 font-medium">
                        {app.Expected_Salary}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => openModal(app)}
                    className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*SINGLE MODAL*/}
        <dialog id="update_modal" className="modal">
          <div className="modal-box bg-white text-black rounded-2xl border border-slate-200 shadow-2xl">
            <form onSubmit={handleSubmit(handleUpdate)}>
              <h3 className="font-bold text-xl mb-6 text-center text-slate-800">
                Update Application
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    {...register("Name")}
                    readOnly
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register("Email")}
                    readOnly
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Qualification
                  </label>
                  <input
                    {...register("Qualification", { required: true })}
                    placeholder="Enter your qualification"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                  />
                  {errors.Qualification && (
                    <p className="text-red-500 text-sm mt-1">Required</p>
                  )}
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Experience
                  </label>
                  <input
                    {...register("Experience", { required: true })}
                    placeholder="Enter your experience"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                  />
                  {errors.Experience && (
                    <p className="text-red-500 text-sm mt-1">Required</p>
                  )}
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Expected Salary
                  </label>
                  <input
                    {...register("Expected_Salary", { required: true })}
                    placeholder="Enter expected salary"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                  />
                  {errors.Expected_Salary && (
                    <p className="text-red-500 text-sm mt-1">Required</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl hover:bg-slate-300"
                  onClick={() =>
                    document.getElementById("update_modal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyApplication;
