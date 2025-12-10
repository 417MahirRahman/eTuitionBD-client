import { Navigate, useLocation } from "react-router";
import Loader from "../utilities/Loader";
import { useContext } from "react";
import AuthContext from "../providers/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader></Loader>;
  if (user && user?.email) return children;
  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;
