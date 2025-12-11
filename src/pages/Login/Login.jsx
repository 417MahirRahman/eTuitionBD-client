import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../providers/AuthContext";
import { Bounce, toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { auth, login } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const { email, password } = data;
      await login(email, password);
    },
    onSuccess: () => {
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      navigate(`${location.state ? location.state : "/"}`);
    },
    onError: () => {
      toast.error("Something went Wrong!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  const handleLogin = (data) => {
    loginMutation.mutate(data);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });

        const userInfo = {
          name: result.user.displayName,
          role: "student",
          Image_URL: result.user.photoURL,
          phoneNumber: "",
          email: result.user.email,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("User data stored in the database", res.data)
          navigate(`${location.state ? location.state : "/"}`);
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
        toast.error("Something went Wrong", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-center font-bold text-white mb-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        Login Now
      </h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border-2 shadow-2xl p-4">
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
              {...register("password", { required: "Password is required" })}
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
            Login
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
            Don't have an account?{" "}
            <Link to={"/register"} className="text-red-700 font-bold">
              Register
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
