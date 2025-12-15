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
    axiosSecure(`/tuitions/${user.email}`)
      .then((res) => {
        setData(res.data.result);
      })
      .finally(() => setLoading(false));
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
    <div className="mb-20">
      <h1 className="text-center font-bold text-3xl my-10">MY TUITIONS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {data.map(
          (tuition) =>
            tuition.Status === "Approved" && (
              <div key={tuition._id} className="card bg-base-100 shadow">
                <div className="card-body">
                  <h2 className="card-title">Class: {tuition.Class}</h2>
                  <p>Subjects: {tuition.Subjects}</p>
                  <p>Budget: {tuition.Budget}</p>
                  <p>Location: {tuition.Location}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openModal(tuition)}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tuition._id)}
                      className="btn btn-error"
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
        <div className="modal-box bg-white text-black">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <h3 className="font-bold text-lg mb-4 text-center">
              Update Tuition
            </h3>

            <input
              className="input w-full mb-2"
              placeholder="Class"
              {...register("Class", { required: true })}
            />

            <input
              className="input w-full mb-2"
              placeholder="Subjects"
              {...register("Subjects", { required: true })}
            />

            <input
              className="input w-full mb-2"
              placeholder="Budget"
              {...register("Budget", { required: true })}
            />

            <input
              className="input w-full mb-4"
              placeholder="Location"
              {...register("Location", { required: true })}
            />

            <div className="flex justify-end gap-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("update_modal").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyTuitions;
