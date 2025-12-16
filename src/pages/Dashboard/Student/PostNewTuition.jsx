import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";

const PostNewTuition = () => {
  const [formDataToSend, setFormDataToSend] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [role] = useRole();
  console.log("Role", role);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!formDataToSend) return;

    const addTuition = () => {
      axiosSecure
        .post("/tuitionPost", formDataToSend)
        .then(() => {
          toast.success("Tuition Posted Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          reset();
          setFormDataToSend(null);
        })
        .catch(() => {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    };

    addTuition();
  }, [formDataToSend, reset, axiosSecure]);

  const handleSendPost = (data) => {
    const formData = {
      Class: data.class,
      Subjects: data.subject,
      Budget: data.budget,
      Location: data.location,
      Status: "Pending",
      Email: user.email,
    };
    setFormDataToSend(formData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
          Post New Tuition
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <form onSubmit={handleSubmit(handleSendPost)} className="space-y-6">
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Class
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                placeholder="Enter your class"
                {...register("class", { required: "Class is required" })}
              />
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                placeholder="Enter subjects"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Budget
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                placeholder="Enter monthly budget amount"
                {...register("budget", { required: "Budget is required" })}
              />
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                placeholder="Enter your location"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
            >
              Post Tuition
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostNewTuition;
