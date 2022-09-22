import React from "react";
import { Navigate, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Login, Register } from "./pages/";



function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export const UnauthorizedApp = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);
