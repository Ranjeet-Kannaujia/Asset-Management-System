import React, { useContext, useState } from "react";
import { NavLink, Link, Navigate, useNavigate, json } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
// import { UserContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  // const { state, dispatch } = useContext(UserContext);

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const { role, email, password } = formData;
  const [error, setError] = useState("");
  //Onchange
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/login",
        { role, email, password },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("userAuth", response.data.token);

        window.alert("Logged in");
        navigate("/assets");
      }
    } catch (err) {
      // console.log("err", err.response.data.success);

      //  setError("Invalid credentials");
      // Clear any existing token from localStorage
      // localStorage.removeItem("userAuth");
      window.alert("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="main-wrapper">
        {/* <img className="loginBgImage" src={bgImage} alt="" /> */}
        <div className="wrapper">
          <div className="form-box login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}
              <div className="selectCategory">
                <label for="role">Assigned Role:</label>
                <select
                  required
                  name="role"
                  // value={formData.floorNo}
                  value={formData.role}
                  // onChange={handleChange}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail-outline"></ion-icon>
                </span>
                {/* <input type="email" required />
              <label htmlFor=""> Email</label> */}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email"> Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                </span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password"> Password</label>
              </div>
              <button
                type="submit"
                onClick={() => {
                  handleSubmit ? (
                    <Link to="/assets" />
                  ) : (
                    console.log("Invalid credentintials")
                  );
                }}
                className="btn2"
              >
                Login
              </button>
              {/* <div className="login-register">
                <p>
                  Don't have an account?
                  <NavLink className={"register-link"} to="/register">
                    Register
                  </NavLink>
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
