import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";
import Loader from "../../../utilities/Loader";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyTuitions = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  /*FETCH DATA*/
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/tuitions/${user.email}`).then((res) => {
      setData(res.data.result || []);
      setLoading(false);
      console.log("Data:", res.data.result);
    });
  }, [axiosSecure, user]);

  if (loading) return <Loader />;

  /*OPEN MODAL*/
  const openModal = (tuition) => {
    setSelectedTuition(tuition);
    reset(tuition);
    document.getElementById("update_modal").showModal();
  };

  /*UPDATE*/
  const handleUpdate = async (formData) => {
    try {
      await axiosSecure.put(`/tuitionPost/${selectedTuition._id}`, formData);
      setData((prev) =>
        prev.map((item) =>
          item._id === selectedTuition._id ? { ...item, ...formData } : item
        )
      );

      Swal.fire("Updated!", "Tuition updated successfully", "success");

      document.getElementById("update_modal").close();
      reset();
      setSelectedTuition(null);
    } catch {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  /*DELETE*/
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/tuitionPost/${id}`);
        setData((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Tuition removed", "success");
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {data.length === 0 ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-3xl md:text-4xl text-slate-600">
              No Tuition Posted Yet
            </p>
          </div>
        ) : (
          <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
            MY TUITIONS
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => openModal(tuition)}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(tuition._id)}
                        className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700  shadow-md hover:shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        {/*SINGLE MODAL*/}
        <dialog id="update_modal" className="modal">
          <div className="modal-box bg-white text-black rounded-2xl border border-slate-200 shadow-2xl">
            <form onSubmit={handleSubmit(handleUpdate)}>
              <h3 className="font-bold text-xl mb-6 text-center text-slate-800">
                Update Tuition Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Class
                  </label>
                  <input
                    className="input input-bordered w-full px-4 py-3 rounded-xl border-slate-300"
                    placeholder="Enter class (e.g., 7, 8, 9)"
                    {...register("Class", { required: true })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Subjects
                  </label>
                  <input
                    className="input input-bordered w-full px-4 py-3 rounded-xl border-slate-300"
                    placeholder="Enter subjects (e.g., Math, Physics)"
                    {...register("Subjects", { required: true })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Budget
                  </label>
                  <input
                    className="input input-bordered w-full px-4 py-3 rounded-xl border-slate-300"
                    placeholder="Enter budget amount"
                    {...register("Budget", { required: true })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Location
                  </label>
                  <input
                    className="input input-bordered w-full px-4 py-3 rounded-xl border-slate-300"
                    placeholder="Enter location"
                    {...register("Location", { required: true })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                >
                  Save Changes
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

export default MyTuitions;
