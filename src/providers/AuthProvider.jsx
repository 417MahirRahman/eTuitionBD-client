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

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const user = {email: currentUser.email}
        fetch("http://localhost:3000/getToken", {
          method: 'POST',
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify(user)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After getting Token", data.token);
            localStorage.setItem('token', data.token)
          });
      }else{
        localStorage.removeItem('token')
      }
      setLoading(false);
    });
    return () => {
      unSubscribed();
    };
  }, [auth]);

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
