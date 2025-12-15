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
          item._id === selectedUser._id
            ? { ...item, ...formData }
            : item
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
    <div className="mb-20">
      <h1 className="text-center font-bold my-10 text-3xl lg:text-5xl">
        Users Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {data.map((userData) => (
          <div key={userData._id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Name: {userData.name}</h2>
              <p>Email: {userData.email}</p>
              <p>Role: {userData.role}</p>
              <p>Phone: {userData.phoneNumber}</p>

              <div className="card-actions mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => openModal(userData)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(userData._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*SINGLE MODAL*/}
      <dialog id="update_user_modal" className="modal">
        <div className="modal-box bg-white text-black">
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <h3 className="font-bold text-lg mb-4 text-center">
              Update User
            </h3>

            <label className="label">Name</label>
            <input
              {...register("name", { required: true })}
              className="input w-full mb-2"
            />
            {errors.name && <p className="text-red-500">Name required</p>}

            <label className="label">Role</label>
            <select
              {...register("role", { required: true })}
              className="input w-full mb-2"
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>

            <label className="label">Photo URL</label>
            <input
              {...register("Image_URL", { required: true })}
              className="input w-full mb-2"
            />

            <label className="label">Phone Number</label>
            <input
              {...register("phoneNumber", { required: true })}
              className="input w-full mb-2"
            />

            <label className="label">Email</label>
            <input
              {...register("email")}
              readOnly
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
  );
};

export default UsersManagement;
