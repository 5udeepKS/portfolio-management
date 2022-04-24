import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Auth(props) {
  const { children } = props;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}
