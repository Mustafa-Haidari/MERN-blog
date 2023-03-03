import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./user-context";

const PrivateRoutes = () => {
  const { userInfo } = useContext(AuthContext);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
