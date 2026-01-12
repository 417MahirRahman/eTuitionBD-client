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
    setValue,
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
          console.log("User data stored in the database", res.data);
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

  // Demo Login
  const handleDemoLogin = () => {
    setValue("email", "demo123@gmail.com");
    setValue("password", "Demo123");

    // Optional auto login
    loginMutation.mutate({
      email: "demo123@gmail.com",
      password: "Demo123",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <h1 className="text-center font-bold text-slate-800 mb-8 text-3xl md:text-4xl">
          Login Now
        </h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
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
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
          >
            Login
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

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-200 transition shadow-sm"
          >
            Demo Login
          </button>

          <p className="text-center mt-6 text-slate-600">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
