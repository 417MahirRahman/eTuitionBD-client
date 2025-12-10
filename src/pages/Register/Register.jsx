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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-center font-bold text-white mb-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        Register Here
      </h1>

      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label font-bold">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <label className="label font-bold">Select Role</label>
          <select
            className="input w-full"
            {...register("role", { required: "Select an Option" })}
          >
            <option value="">Student/Tutor</option>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>

          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}

          <label className="label font-bold">Photo URL</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Image-URL"
            {...register("Image_URL", { required: "Image URL is required" })}
          />
          {errors.Image_URL && (
            <p className="text-red-500 text-sm">{errors.Image_URL.message}</p>
          )}

          <label className="label font-bold">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <label className="label font-bold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input w-full"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              onClick={togglePassword}
              className="absolute top-4 right-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="btn bg-[#DC143C] text-white font-bold rounded-xl"
          >
            Register
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn bg-white text-black border-[#e5e5e5] rounded-xl font-bold"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
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

          <p className="text-center mt-2 font-bold">
            Already have an account?{" "}
            <Link to={"/login"} className="text-red-700 font-bold">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
