import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loader from "../../utilities/Loader";
import { Bounce, toast } from "react-toastify";
import useRole from "../../hooks/useRole";
import AuthContext from "../../providers/AuthContext";
import { ArrowLeft } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TuitionDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState([])
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true)
    const loadTuitionDetails = async () => {
      setLoading(true);
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        navigate("/tuitionPostNotFound");
        return;
      }
      const res = await axiosSecure(`allTuitions/${id}`);
      const res2 = await axiosSecure(`/users/${user.email}`)
      setData(res.data.result);
      setUserData(res2.data.result)
      //console.log("Data:", res.data.result);
      //console.log("Data2:", res2.data.result);
      setLoading(false);
    };
    loadTuitionDetails();
  }, [id, navigate, axiosSecure, user]);

  const addTuitionMutation = useMutation({
    mutationFn: async (formData) => {
      axiosSecure.post("/tutorApplication", formData);
    },
    onSuccess: () => {
      toast.success("Applied Successfully", {
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
      studentEmail: data.Email,
      Budget: data.Budget,
      Class: data.Class,
      Location: data.Location,
      Subjects: data.Subjects,
      Name: Data.Name,
      Email: Data.Email,
      Qualification: Data.Qualification,
      Experience: Data.Experience,
      Expected_Salary: Data.Expected_Salary,
      tutorImage: userData.Image_URL,
      tutorPhoneNumber: userData.phoneNumber,
      Status: "Pending",
      Date: new Date(),
    };
    addTuitionMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center font-bold mb-8 text-3xl md:text-4xl text-slate-800">
          TUITION DETAILS
        </h1>

        <div
          className={
            role === "tutor"
              ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
              : "grid grid-cols-1"
          }
        >
          {/* Tuition Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate("/all-tuition")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  Class Information
                </h2>
                <div className="w-16 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full mb-4"></div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Class:</span>
                    <span className="text-slate-600">{data.Class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">
                      Subjects:
                    </span>
                    <span className="text-slate-600">{data.Subjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">
                      Budget:
                    </span>
                    <span className="text-green-600 font-medium">
                      {data.Budget}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">
                      Location:
                    </span>
                    <span className="text-slate-600">{data.Location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Form Section */}
          {role === "tutor" && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Apply for Tuition
              </h2>
              <div className="w-16 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full mb-6"></div>

              <form
                onSubmit={handleSubmit(handleApplyPost)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    {...register("Name", { required: "Name is required" })}
                    type="text"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    defaultValue={user?.displayName}
                    readOnly
                  />
                  {errors.Name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register("Email", { required: "Email is required" })}
                    type="email"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    defaultValue={user?.email}
                    readOnly
                  />
                  {errors.Email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Qualification
                  </label>
                  <input
                    {...register("Qualification", {
                      required: "Qualification is required",
                    })}
                    type="text"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter your qualification"
                  />
                  {errors.Qualification && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Qualification.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Experience
                  </label>
                  <input
                    {...register("Experience", {
                      required: "Experience is required",
                    })}
                    type="text"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter your experience"
                  />
                  {errors.Experience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Experience.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Expected Salary
                  </label>
                  <input
                    {...register("Expected_Salary", {
                      required: "Expected Salary is required",
                    })}
                    type="text"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Enter expected salary"
                  />
                  {errors.Expected_Salary && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Expected_Salary.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700  shadow-md hover:shadow-lg"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
