import { useContext } from "react";
import { AuthContext } from "../auth/authContext.jsx";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  localStorage.setItem("lastPath", pathname + search);

  return user.logged ? children : <Navigate to="/" />;
};
