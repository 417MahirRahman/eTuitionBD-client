import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../providers/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../../../utilities/Loader";

const MyApplication = () => {
  {
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
        const result = await axiosSecure(`/tutorApplication/${user.email}`);
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
    const openModal = (tutor) => {
      setDefaultFormData(tutor);
      setValue("Qualification", tutor.Qualification);
      setValue("Experience", tutor.Experience);
      setValue("Expected_Salary", tutor.Expected_Salary);

      document.getElementById(`modal_${tutor._id}`).showModal();
    };

    const handleUpdateInfo = (id, formData) => {
      axiosSecure.put(`/tutorApplication/${id}`, formData).then((updatedInfo) => {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, ...updatedInfo } : item
          )
        );

        Swal.fire({
          title: "Updated!",
          text: "Your application details updated successfully.",
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
          axiosSecure.delete(`/tutorApplication/${id}`).then(() => {
            setData((prev) => prev.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Your applicaton has been removed.", "success");
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
          {data.map((tutor) => (
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
                  <button
                    onClick={() => openModal(tutor)}
                    className="btn btn-primary"
                  >
                    Update Info
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteBtn(tutor._id);
                    }}
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </div>

                {/* Modal */}
                <dialog id={`modal_${tutor._id}`} className="modal">
                  <div className="modal-box bg-white text-black">
                    <form
                      onSubmit={handleSubmit((formData) =>
                        handleUpdateInfo(tutor._id, formData)
                      )}
                    >
                      <h3 className="font-bold text-lg mb-4 text-center">
                        Update Info
                      </h3>

                      <label className="label font-bold">Name</label>
                      <input
                        type="text"
                        defaultValue={defaultFormData?.Name}
                        className="input w-full"
                        placeholder="Name"
                        {...register("Name")}
                        readOnly
                      />
                      {errors.Name && (
                        <p className="text-red-500 text-sm">
                          {errors.Name.message}
                        </p>
                      )}

                      <label className="label font-bold">Email</label>
                      <input
                        type="email"
                        defaultValue={defaultFormData?.Email}
                        className="input w-full"
                        placeholder="Write email here..."
                        {...register("Email")}
                        readOnly
                      />
                      {errors.Email && (
                        <p className="text-red-500 text-sm">
                          {errors.Email.message}
                        </p>
                      )}

                      <label className="label font-bold">Qualification</label>
                      <input
                        type="text"
                        defaultValue={defaultFormData?.Qualification}
                        className="input w-full"
                        placeholder="Write your qualification here..."
                        {...register("Qualification", {
                          required: "Qualification is required",
                        })}
                      />
                      {errors.Qualification && (
                        <p className="text-red-500 text-sm">
                          {errors.Qualification.message}
                        </p>
                      )}

                      <label className="label font-bold">Experience</label>
                      <input
                        type="text"
                        defaultValue={defaultFormData?.Experience}
                        className="input w-full"
                        placeholder="Write your Experience here..."
                        {...register("Experience", {
                          required: "Experience is required",
                        })}
                      />
                      {errors.Experience && (
                        <p className="text-red-500 text-sm">
                          {errors.Experience.message}
                        </p>
                      )}

                      <label className="label font-bold">Expected Salary</label>
                      <input
                        type="text"
                        defaultValue={defaultFormData?.Expected_Salary}
                        className="input w-full"
                        placeholder="Write your expected salary here..."
                        {...register("Expected_Salary", {
                          required: "Expected Salary is required",
                        })}
                      />
                      {errors.Expected_Salary && (
                        <p className="text-red-500 text-sm">
                          {errors.Expected_Salary.message}
                        </p>
                      )}

                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          onClick={() => {
                            document
                              .getElementById(`modal_${tutor._id}`)
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
                              .getElementById(`modal_${tutor._id}`)
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
  }
};

export default MyApplication;
