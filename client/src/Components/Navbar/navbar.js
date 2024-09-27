import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import DialogBox from "./dialog";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import "./navbar.css";

const Navbar = ({ role }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  console.log("role from props in Navbar::", role);

  console.log("role from protected props>>>>>>+ ", role);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());

    setOpen(false);
  };
  
  return (
    <div className="container-fluid">
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        {" "}
        <Link className="navbar-brand" to="#">
          Task
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {role === "admin" && (
              <>
                <Link to="/home" className="nav-item nav-link">
                  Dashboard
                </Link>

                <Link to="/users" className="nav-item nav-link">
                Users
                </Link>

                <Link to="/setting" className="nav-item nav-link">
                  Setting
                </Link>

                <div
                  className="logout-button ms-lg-auto"
                   style={{ right: "10px" }}
                >
                  <FaSignOutAlt
                    size={33}
                    style={{ cursor: "pointer", color: "#2982c5" }}
                    onClick={handleClickOpen}
                  />
                </div>
              </>
            )}

            {/*        <Link to="/home" className="nav-item nav-link">
              Dashboard
            </Link> */}
            {/* <p>Frim protected:{role.role}</p> */}
            {role === "patient" && (
              <>
                <Link to="/about" className="nav-item nav-link">
                  Provider
                </Link>
                <Link to="/setting" className="nav-item nav-link">
                  Setting<span><IoSettingsOutline size={20}/></span>
                </Link>
                {/* <div className="ms-lg-auto">
                  <FaSignOutAlt
                    size={33}
                    style={{ cursor: "pointer", color: "#2982c5" }}
                    onClick={handleClickOpen}
                  />
                </div> */}

                <div
                  className="logout-button ms-lg-auto"
                  //  style={{ right: "10px"}}
                >
                  <FaSignOutAlt
                    size={33}
                    style={{ cursor: "pointer", color: "#2982c5" }}
                    onClick={handleClickOpen}
                  />
                </div>
              </>
            )}

            {/* <a className="nav-item nav-link disabled" href="">
               Disabled
             </a>  */}
          </div>
        </div>
        {/* <div className="ml-auto">
          <FaSmile
            size={40}
            style={{ cursor: "pointer", color: "rebeccapurple" }}
            onClick={handleClickOpen}
          />
        </div> */}
      </nav>

      <DialogBox
        open={open}
        onClose={handleClose}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;
