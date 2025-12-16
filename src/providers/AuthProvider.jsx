import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import AuthContext from "./AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const user = { email: currentUser.email };
        axiosSecure
          .post("/getToken", user)
          .then((data) => {
            //console.log("Token", data.token);
            localStorage.setItem("token", data.data.token);
          });
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => {
      unSubscribed();
    };
  }, [auth, axiosSecure]);

  const AuthData = {
    auth,
    user,
    setUser,
    createUser,
    login,
    logOut,
    updateUser,
    loading,
    setLoading,
  };

  return <AuthContext value={AuthData}>{children}</AuthContext>;
};

export default AuthProvider;
