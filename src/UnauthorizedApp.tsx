import React, { useContext } from "react";
import { Navigate, Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { UserContext } from "./context";
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

export const UnauthorizedApp = () => {
  
  const {user}  = useContext(UserContext);
  
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={ user ? "/login" : "/myboards"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>
);}
