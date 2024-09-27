import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token"); 
  const [role, setUserRole] = useState("");
    
    useEffect(() => {    
      if(token){
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
        console.log("decode token role from protected>>>", decodedToken.role);
      }
    
    },[token]);

console.log("allowroutes from Protesdededd", allowedRoles);


  //add new line for user role
  console.log("update auth state in protected", isAuthenticated);
  console.log("decode token from navallowedRoles[0] bar role---45",role);

  if (!isAuthenticated && !token) {
    return <Navigate to="/" />;
  }

  if(allowedRoles[0] && !allowedRoles[0].includes(role)){
    return <Navigate to="/not-authorized" />
  }

 



  return (
    <>
      <Navbar role={role}/>
      
      {/* {role === "admin" && <Navigate to="/home" replace/>}
      {role === "patient" && <Navigate to="/about" replace/>} */}
      
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
