import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
