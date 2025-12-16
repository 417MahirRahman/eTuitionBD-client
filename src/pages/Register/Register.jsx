import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../../providers/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { PasswordValidation } from "../../utilities/Validation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { auth, createUser, updateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const { name, Image_URL, email, password } = data;

      const validPassword = PasswordValidation(password);
      if (validPassword) {
        throw new Error(validPassword);
      }

      const result = await createUser(email, password);

      const user = result.user;
      await updateUser({ displayName: name, photoURL: Image_URL });

      setUser({ ...user, displayName: name, photoURL: Image_URL });

      axiosSecure.post("/users", data);

      return user;
    },
    onSuccess: () => {
      navigate("/");
      toast.success("Account Created Successfully", {
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
    onError: (error) => {
      console.log(error.message);
      toast.error(`${error.message || "Invalid Information"}`, {
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

  const handleRegister = (data) => {
    registerMutation.mutate(data);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toast.success("Account Created Successfully", {
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 my-15">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <h1 className="text-center font-bold text-slate-800 mb-8 text-3xl md:text-4xl">
          Register Here
        </h1>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Select Role
            </label>
            <select
              className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              {...register("role", { required: "Select an option" })}
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Photo URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              placeholder="Enter image URL"
              {...register("Image_URL", { required: "Image URL is required" })}
            />
            {errors.Image_URL && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Image_URL.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
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
              className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl pr-12"
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                onClick={togglePassword}
                className="absolute top-3.5 right-3 cursor-pointer text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
          >
            Register
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full bg-white text-slate-700 border border-slate-300 font-semibold py-3 px-6 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-3 shadow-sm"
          >
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-center mt-6 text-slate-600">
            Already have an account?
            <Link
              to={"/login"}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
