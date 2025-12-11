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
  const [defaultFormData, setDefaultFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Fetching Data
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const result = await axiosSecure(`/allTuitions/${user.email}`);
      setData(result.data.result);
      //console.log("data", result.data.result);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader></Loader>;
  }

  //Updating Data
  const openModal = (tuition) => {
    setDefaultFormData(tuition);
    setValue("Class", tuition.Class);
    setValue("Subjects", tuition.Subjects);
    setValue("Budget", tuition.Budget);
    setValue("Location", tuition.Location);

    document.getElementById(`modal_${tuition._id}`).showModal();
  };

  const handleUpdateInfo = (id, formData) => {
    axiosSecure.put(`/tuitionPost/${id}`, formData).then((updatedInfo) => {
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, ...updatedInfo } : item
        )
      );

      Swal.fire({
        title: "Updated!",
        text: "Tuition details updated successfully.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    });
  };

  //Deleting Data
  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuitionPost/${id}`).then(() => {
          setData((prev) => prev.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Tuition post has been removed.", "success");
        });
      }
    });
  };

  return (
    <div className="mb-20">
      <h1 className="text-center font-bold my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        MY TUITIONS
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
                <button
                  onClick={() => openModal(tuition)}
                  className="btn btn-primary"
                >
                  Update Info
                </button>
                <button
                  onClick={() => {
                    handleDeleteBtn(tuition._id);
                  }}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </div>

              {/* Modal */}
              <dialog id={`modal_${tuition._id}`} className="modal">
                <div className="modal-box bg-white text-black">
                  <form
                    onSubmit={handleSubmit((formData) =>
                      handleUpdateInfo(tuition._id, formData)
                    )}
                  >
                    <h3 className="font-bold text-lg mb-4 text-center">
                      Update Info
                    </h3>

                    <label className="label font-bold">Class</label>
                    <input
                      type="text"
                      defaultValue={defaultFormData?.Class}
                      className="input w-full"
                      placeholder="Class"
                      {...register("Class", { required: "Class is required" })}
                    />
                    {errors.Class && (
                      <p className="text-red-500 text-sm">
                        {errors.Class.message}
                      </p>
                    )}

                    <label className="label font-bold">Subject</label>
                    <input
                      type="text"
                      defaultValue={defaultFormData?.Subjects}
                      className="input w-full"
                      placeholder="Write subjects name here..."
                      {...register("Subjects", {
                        required: "Subject is required",
                      })}
                    />
                    {errors.Subjects && (
                      <p className="text-red-500 text-sm">
                        {errors.Subjects.message}
                      </p>
                    )}

                    <label className="label font-bold">Budget</label>
                    <input
                      type="text"
                      defaultValue={defaultFormData?.Budget}
                      className="input w-full"
                      placeholder="Write amount here..."
                      {...register("Budget", {
                        required: "Budget is required",
                      })}
                    />
                    {errors.Budget && (
                      <p className="text-red-500 text-sm">
                        {errors.Budget.message}
                      </p>
                    )}

                    <label className="label font-bold">Location</label>
                    <input
                      type="text"
                      defaultValue={defaultFormData?.Location}
                      className="input w-full"
                      placeholder="Write your location here..."
                      {...register("Location", {
                        required: "Location is required",
                      })}
                    />
                    {errors.Location && (
                      <p className="text-red-500 text-sm">
                        {errors.Location.message}
                      </p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => {
                          document
                            .getElementById(`modal_${tuition._id}`)
                            .close();
                          setDefaultFormData(null);
                        }}
                        className="btn bg-[#DC143C] text-white"
                      >
                        Update
                      </button>

                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          document
                            .getElementById(`modal_${tuition._id}`)
                            .close();
                          reset();
                          setDefaultFormData(null);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTuitions;
