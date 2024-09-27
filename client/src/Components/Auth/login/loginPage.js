import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { useNavigate } from "react-router-dom";
import SignUp from "../register/signUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../redux/slice/authSlice";
import { jwtDecode } from "jwt-decode";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("pradip12@gmail.com");
  const [password, setPassword] = useState("Pradip@123");
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const token = localStorage.getItem("token");

  console.log("token from login page", token);

  const navigateBasedOnRole = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (role === "admin") {
        navigate("/home");
      } else if (role === "patient") {
        navigate("/about");
      }
    } catch (error) {
      console.error("Error decoding token", error);
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // console.log("token from login page", token);

    if (token) {
      navigateBasedOnRole(token);
    }
  }, [token]);

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    console.log("from validateEmail");
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{8,}$/;
    return passwordRegex.test(password);
  }

  function handleClick(e) {
    let validationErrors = {};

    if (!email) {
      validationErrors.email = "email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 8 characters, contain one uppercase letter, and one special character.";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        dispatch(login({ email, password }));
      } catch (err) {
        toast.error("Login failed. Please try again.");
      }
    } else {
      setErrors(validationErrors);
    }
  }

  function btnclicked(e) {
    e.preventDefault();
    handleClick();
  }

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    } else if (status === "succeeded") {
      toast.success("login successfulll");
    }
  }, [status, error]);

  return (
    <div className={`main-div ${isLogin ? "slide-in" : "slide-out"}`}>
      {isLogin ? (
        <div>
          <h1>Sign In</h1>
          <div className="login-form">
            <form>
              <div className="text_area">
                {" "}
                <label>
                  Username
                  <input
                    type="text"
                    value={email}
                    className="text_input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <br /> <br />
              <div
                className="text_area"
                style={{ position: "relative", display: "inline-block" }}
              >
                {" "}
                <label>
                  Password:
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    className="text_input"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "22px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {isPasswordVisible ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </span>{" "}
                </label>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <br />
              <br />
              <div></div>
              <button type="submit" className="btn" onClick={btnclicked}>
                Login
              </button>
              {/* {status === 'failed' && <p className="error">{toast.error(error.message)} </p>} */}
            </form>
          </div>
          {/* 
        <Link to="/sign" className="sign">
          Don't have an account? <span style={{ color: "black" }}>Sign Up</span>
        </Link> */}
          <button className="toggle-btn" onClick={() => setIsLogin(false)}>
            Don't have an account?{" "}
            <span style={{ color: "black" }}> Sign Up</span>
          </button>
        </div>
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default LoginPage;
