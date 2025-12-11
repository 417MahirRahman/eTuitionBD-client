import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";

const PostNewTuition = () => {
  const [formDataToSend, setFormDataToSend] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext)
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
      Email: user.email
    };
    setFormDataToSend(formData);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-center font-bold mb-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
          Post New Tuition
        </h1>

        <form onSubmit={handleSubmit(handleSendPost)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <label className="label font-bold">Class</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Class"
              {...register("class", { required: "Class is required" })}
            />
            {errors.class && (
              <p className="text-red-500 text-sm">{errors.class.message}</p>
            )}

            <label className="label font-bold">Subject</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Write subjects name here....."
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}

            <label className="label font-bold">Budget</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Write amount here....."
              {...register("budget", { required: "Budget is required" })}
            />
            {errors.budget && (
              <p className="text-red-500 text-sm">{errors.budget.message}</p>
            )}

            <label className="label font-bold">Location</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Write your location here....."
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}

            <button
              type="submit"
              className="btn bg-[#DC143C] text-white font-bold rounded-xl"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PostNewTuition;
