import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";
import Loader from "../../../utilities/Loader";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const UsersManagement = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //FETCH USERS
  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/allUsers").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [axiosSecure, user]);

  if (loading) return <Loader />;

  //OPEN MODAL
  const openModal = (userData) => {
    setSelectedUser(userData);
    reset(userData);
    document.getElementById("update_user_modal").showModal();
  };

  //UPDATE USER
  const handleUpdateUser = async (formData) => {
    try {
      await axiosSecure.put(`/updateUsers/${selectedUser._id}`, formData);

      setData((prev) =>
        prev.map((item) =>
          item._id === selectedUser._id ? { ...item, ...formData } : item
        )
      );

      document.getElementById("update_user_modal").close();
      setSelectedUser(null);
      Swal.fire("Updated!", "User updated successfully", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  //DELETE USER
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/allUsers/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
      Swal.fire("Deleted!", "User removed successfully", "success");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {data.length === 0 ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-3xl md:text-4xl text-slate-600">
              No Users Found
            </p>
          </div>
        ) : (
          <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
            Users Management
          </h1>
        )}

        <h1 className="font-semibold mb-2 text-2xl md:text-3xl text-slate-800">
          Admin:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {data.map(
            (userData) =>
              userData.role === "admin" && (
                <div
                  key={userData._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
                >
                  <div className="p-6">
                    <div className="flex justify-center items-center mb-5 border-2 border-blue-500 bg-blue-500 rounded-4xl">
                      <img
                        className="rounded-full"
                        src={userData.Image_URL}
                        alt=""
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">
                        User: {userData.name}
                      </h3>
                      <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                    <div className="space-y-3 text-slate-600">
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Email:
                        </span>
                        {userData.email}
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Role:
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userData.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : userData.role === "tutor"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {userData.role}
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Phone:
                        </span>
                        {userData.phoneNumber}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => openModal(userData)}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(userData._id)}
                        className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        <h1 className="font-semibold mb-2 text-2xl md:text-3xl text-slate-800">
          Tutor:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {data.map(
            (userData) =>
              userData.role === "tutor" && (
                <div
                  key={userData._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
                >
                  <div className="p-6">
                    <div className="flex justify-center items-center mb-5 border-2 border-blue-500 bg-blue-500 rounded-4xl">
                      <img
                        className="rounded-full"
                        src={userData.Image_URL}
                        alt=""
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">
                        User: {userData.name}
                      </h3>
                      <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                    <div className="space-y-3 text-slate-600">
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Email:
                        </span>
                        {userData.email}
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Role:
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userData.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : userData.role === "tutor"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {userData.role}
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Phone:
                        </span>
                        {userData.phoneNumber}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => openModal(userData)}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(userData._id)}
                        className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        <h1 className="font-semibold mb-2 text-2xl md:text-3xl text-slate-800">
          Student:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map(
            (userData) =>
              userData.role === "student" && (
                <div
                  key={userData._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200"
                >
                  <div className="p-6">
                    <div className="flex justify-center items-center mb-5 border-2 border-blue-500 bg-blue-500 rounded-4xl">
                      <img
                        className="rounded-full"
                        src={userData.Image_URL}
                        alt=""
                      />
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">
                        User: {userData.name}
                      </h3>
                      <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                    <div className="space-y-3 text-slate-600">
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Email:
                        </span>
                        {userData.email}
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Role:
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userData.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : userData.role === "tutor"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {userData.role}
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold text-slate-700 mr-2">
                          Phone:
                        </span>
                        {userData.phoneNumber}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => openModal(userData)}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(userData._id)}
                        className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg"
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
        <dialog id="update_user_modal" className="modal">
          <div className="modal-box bg-white text-black rounded-2xl border border-slate-200 shadow-2xl">
            <form onSubmit={handleSubmit(handleUpdateUser)}>
              <h3 className="font-bold text-xl mb-6 text-center text-slate-800">
                Update User Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter user name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">Name required</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Role
                  </label>
                  <select
                    {...register("role", { required: true })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Photo URL
                  </label>
                  <input
                    {...register("Image_URL", { required: true })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber", { required: true })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    readOnly
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                >
                  Update User
                </button>
                <button
                  type="button"
                  className="bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl hover:bg-slate-300"
                  onClick={() =>
                    document.getElementById("update_user_modal").close()
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

export default UsersManagement;
