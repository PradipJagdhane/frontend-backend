import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import LogoutButton from "../button/logout";
import { jwtDecode } from "jwt-decode";

const DialogBox = ({ open, onClose, handleLogout }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      const decodedToken = jwtDecode(token);
      setUserInfo({
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
      })
    }
  },[])
  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{
        width: "300px",
        height: "280px",
        position: "absolute",
        float: "inline-end",
        top: 0,
        right: 0,
        //  left: "35rem",
        // alignItems: "flex-start"
      }}
    >
      <DialogTitle>User: <b>{userInfo.name}</b></DialogTitle>
      <DialogContent>
        <p>{userInfo.email}</p>
     <p>Role: {userInfo.role}</p>
            <LogoutButton handleLogout={handleLogout}/>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
