import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../providers/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../utilities/Loader";

const MyProfile = () => {
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
      const result = await axiosSecure(`/users/${user.email}`);
      setData(result.data.result);
      console.log("data", result.data.result);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader></Loader>;
  }

  //Updating Data
  const openModal = () => {
    setDefaultFormData(data);
    setValue("name", data.name);
    setValue("role", data.role);
    setValue("Image_URL", data.Image_URL);
    setValue("phoneNumber", data.phoneNumber);
    setValue("email", data.email);

    document.getElementById(`modal_${data._id}`).showModal();
  };

  const handleUpdate = async (id, formData) => {
    axiosSecure.put(`/users/${id}`, formData).then((updatedInfo) => {
      setData((item) => (item._id === id ? { ...item, ...updatedInfo } : item));

      Swal.fire({
        title: "Updated!",
        text: "Tuition details updated successfully.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl xl:text-3xl">
        My Profile
      </h1>

      <div>
        <div className="card w-3/4 mx-auto items-center p-10">
          <div className="avatar">
            <div className="ring-success-content ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
              <img className="" src={data.Image_URL} alt="Profile" />
            </div>
          </div>
          <div className="card-body items-center">
            <h2 className="card-title text-center">{data.name}</h2>
            <p>{data.email}</p>
          </div>
          <div className="flex justify-center items-center gap-5">
            <img
              className="w-8 md:w-10 cursor-pointer"
              src="facebook.png"
              alt=""
            />
            <img
              className="w-8 md:w-10 cursor-pointer"
              src="facebook.png"
              alt=""
            />
            <img
              className="w-8 md:w-10 cursor-pointer"
              src="facebook.png"
              alt=""
            />
          </div>
        </div>

        <div className="flex justify-center items-center p-2">
          <button
            onClick={() => openModal()}
            className="btn bg-[#15803D] text-white rounded"
          >
            Update Profile
          </button>
        </div>

        {
          <dialog id={`modal_${data._id}`} className="modal">
            <div className="modal-box bg-white text-black">
              <form
                onSubmit={handleSubmit((formData) =>
                  handleUpdate(data._id, formData)
                )}
              >
                <h3 className="font-bold text-lg mb-4 text-center">
                  Update Info
                </h3>

                <label className="label font-bold">Name</label>
                <input
                  type="text"
                  defaultValue={defaultFormData?.name}
                  className="input w-full"
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                <label className="label font-bold">Your Role</label>
                <input
                  type="text"
                  defaultValue={defaultFormData?.role}
                  className="input w-full"
                  placeholder="Role"
                  {...register("role")}
                  readOnly
                />
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}

                <label className="label font-bold">Photo URL</label>
                <input
                  type="text"
                  defaultValue={defaultFormData?.Image_URL}
                  className="input w-full"
                  placeholder="Image_URL"
                  {...register("Image_URL", {
                    required: "Image_URL is required",
                  })}
                />
                {errors.Image_URL && (
                  <p className="text-red-500 text-sm">
                    {errors.Image_URL.message}
                  </p>
                )}

                <label className="label font-bold">Phone Number</label>
                <input
                  type="text"
                  defaultValue={defaultFormData?.phoneNumber}
                  className="input w-full"
                  placeholder="Write Phone Number Here..."
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}

                <label className="label font-bold">Email</label>
                <input
                  type="email"
                  defaultValue={defaultFormData?.email}
                  className="input w-full"
                  placeholder="Write your Email here..."
                  {...register("email")}
                  readOnly
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      document.getElementById(`modal_${data._id}`).close();
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
                      document.getElementById(`modal_${data._id}`).close();
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
        }
      </div>
    </div>
  );
};

export default MyProfile;
