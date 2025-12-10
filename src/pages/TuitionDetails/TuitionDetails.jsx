import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loader from "../../utilities/Loader";
import { Bounce, toast } from "react-toastify";

const TuitionDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadTuitionDetails = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/allTuitions/${id}`);
      //   if (!res.ok) {
      //     navigate("/detailsNotFound");
      //     return;
      //   }
      const result = await res.json();
      setData(result.result);
      console.log("Result:", result.result);
      setLoading(false);
    };
    loadTuitionDetails();
  }, [id, navigate]);

  const addTuitionMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("http://localhost:3000/tutorApplication", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      return res.json();
    },

    onSuccess: () => {
      toast.success("Apply Successfully", {
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
      document.getElementById(`modal_${data._id}`).close();
    },

    onError: () => {
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
    },
  });

  if (loading) {
    return <Loader />;
  }

  const handleApplyPost = (Data) => {
    const formData = {
      ...Data,
      tuitionId: data._id,
      Name: Data.Name,
      Email: Data.Email,
      Qualification: Data.Qualification,
      Experience: Data.Experience,
      Expected_Salary: Data.Expected_Salary,
      Status: "Pending",
    };
    addTuitionMutation.mutate(formData);
  };

  return (
    <div className="pb-20 p-2">
      <h1 className="text-center font-bold mt-10 mb-8 text-4xl">
        TUITION DETAILS
      </h1>

      {/* Food Info */}
      <div
        data-aos="flip-left"
        className="hero flex justify-end bg-linear-to-r from-white to-[#DC143C] mt-10 w-full md:w-3/4 mx-auto rounded-xl shadow-2xl"
      >
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div>
            <h1 className="text-3xl font-bold">Class: {data.Class}</h1>
            <p className="font-semibold mt-2">Subjects: {data.Subjects}</p>
            <p className="font-semibold">Budget: {data.Budget}</p>
            <p className="font-semibold">Location: {data.Location}</p>
            {
              <button
                className="btn bg-[#DC143C] text-white font-bold rounded-xl border-none"
                onClick={() =>
                  document.getElementById(`modal_${data._id}`).showModal()
                }
              >
                Apply
              </button>
            }
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id={`modal_${data?._id}`} className="modal">
        <form
          onSubmit={handleSubmit(handleApplyPost)}
          className="modal-box bg-white text-black"
        >
          <h3 className="font-bold text-lg mb-4 text-center">Apply Tuition</h3>

          <label className="label">Name</label>
          <input
            {...register("Name", { required: "Name is required" })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}

          <label className="label mt-3">Email</label>
          <input
            {...register("Email", { required: "Email is required" })}
            type="email"
            className="input input-bordered w-full"
            placeholder="Your Email"
          />
          {errors.Email && (
            <p className="text-red-500">{errors.Email.message}</p>
          )}

          <label className="label mt-3">Qualification</label>
          <input
            {...register("Qualification", {
              required: "Qualification is required",
            })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Qualification"
          />
          {errors.Qualification && (
            <p className="text-red-500">{errors.Qualification.message}</p>
          )}

          <label className="label mt-3">Experience</label>
          <input
            {...register("Experience", {
              required: "Experience is required",
            })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Experience"
          />
          {errors.Experience && (
            <p className="text-red-500">{errors.Experience.message}</p>
          )}

          <label className="label mt-3">Expected Salary</label>
          <input
            {...register("Expected_Salary", {
              required: "Expected Salary is required",
            })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Expected Salary"
          />
          {errors.Expected_Salary && (
            <p className="text-red-500">{errors.Expected_Salary.message}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button className="btn bg-[#DC143C] text-white">Apply</button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                document.getElementById(`modal_${data._id}`).close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default TuitionDetails;
