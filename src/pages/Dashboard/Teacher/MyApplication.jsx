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
          item._id === selectedApp._id
            ? { ...item, ...formData }
            : item
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

  return (
    <div className="mb-20">
      <h1 className="text-center font-bold my-10 text-3xl">
        MY APPLICATIONS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {data
          .filter((app) => app.Status === "Pending")
          .map((app) => (
            <div key={app._id} className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">{app.Name}</h2>
                <p>Email: {app.Email}</p>
                <p>Qualification: {app.Qualification}</p>
                <p>Experience: {app.Experience}</p>
                <p>Expected Salary: {app.Expected_Salary}</p>

                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal(app)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(app._id)}
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
        <div className="modal-box bg-white text-black">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <h3 className="font-bold text-lg text-center mb-4">
              Update Application
            </h3>

            <input {...register("Name")} readOnly className="input w-full mb-2" />
            <input {...register("Email")} readOnly className="input w-full mb-2" />

            <input
              {...register("Qualification", { required: true })}
              placeholder="Qualification"
              className="input w-full mb-2"
            />
            {errors.Qualification && <p className="text-red-500">Required</p>}

            <input
              {...register("Experience", { required: true })}
              placeholder="Experience"
              className="input w-full mb-2"
            />

            <input
              {...register("Expected_Salary", { required: true })}
              placeholder="Expected Salary"
              className="input w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn"
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
  );
};

export default MyApplication;
