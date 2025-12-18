import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../providers/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../utilities/Loader";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [defaultFormData, setDefaultFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("Data:",data)

  const {
    register,
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
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader />;
  }

  //Updating Data
  const openModal = (data) => {
    setDefaultFormData(data);
    document.getElementById(`modal_${data._id}`).showModal();
  };

  const handleUpdate = async (id, formData) => {
    axiosSecure.put(`/users/${id}`, formData).then((updatedInfo) => {
      setData((item) => (item._id === id ? { ...item, ...updatedInfo } : item));

      Swal.fire({
        title: "Updated!",
        text: "Profile updated successfully.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    });
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
          My Profile
        </h1>

        <div className="bg-white rounded-box shadow-lg p-8 border border-slate-200 max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-slate-200 overflow-hidden mb-4">
              <img
                src={data.Image_URL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {data.name}
              </h2>
              <p className="text-slate-600">{data.email}</p>
              <p className="text-slate-600">Phone Number: {data.phoneNumber}</p>
              <p className="text-slate-600">Your Role: {data.role}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => openModal(data)}
              className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
            >
              Update Profile
            </button>
          </div>
        </div>
        
        {/* Update Info Modal */}
        <dialog id={`modal_${data._id}`} className="modal">
          <div className="modal-box bg-white text-black rounded-2xl border border-slate-200 shadow-2xl">
            <form
              onSubmit={handleSubmit((formData) =>
                handleUpdate(data._id, formData)
              )}
            >
              <h3 className="font-bold text-xl mb-6 text-center text-slate-800">
                Update Profile Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={defaultFormData?.name}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    defaultValue={defaultFormData?.role}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-100"
                    placeholder="Role"
                    {...register("role")}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    defaultValue={defaultFormData?.Image_URL}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter image URL"
                    {...register("Image_URL", {
                      required: "Image URL is required",
                    })}
                  />
                  {errors.Image_URL && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Image_URL.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    defaultValue={defaultFormData?.phoneNumber}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter your phone number"
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={defaultFormData?.email}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-100"
                    placeholder="Enter your email"
                    {...register("email")}
                    readOnly
                  />
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
                  onClick={() => {
                    document.getElementById(`modal_${data._id}`).close();
                    reset();
                    setDefaultFormData(null);
                  }}
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

export default MyProfile;
