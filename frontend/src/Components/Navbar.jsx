import React, { useEffect } from "react";
import "../css/Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import AssetHeader from "./AssetHeader";
import NileitLogo from "../assets/NileitLogo.jpg";
import "../css/Header.css";
import { getUserRole, isLoggedIn } from "../utils/auth";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const role = getUserRole().role;
  // const assignedRole =  (role === "user" || role === "admin" ) ? role : "";
  console.log(isLoggedIn());

  useEffect(()=>{
       async function fetchData(){
        if(isLoggedIn()){
          await axios.get("http://localhost:9000/register")
        .then((response) => {
          // // Handle the response, e.g., update state with fetched assets
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching assets:", error);
        });
      }else{
         navigate("/");
      }

       }
  },[isLoggedIn])

  const handleLogout = ()=>{
    if(window.confirm("Are you sure you want to logout?")){
      localStorage.removeItem('userAuth');
      navigate("/login");
      console.log("logged Out");
    }
    console.log("Not sure to logout")
   }

  if (
    location.pathname === "/" ||
    (location.pathname === "/login") ||
    ( location.pathname === "/register")
  ) {
    return (
      <nav>
        <div className="Navbar">
          <ul className="navlist">
            {/* <li className="nav-item">
              <NavLink className={"nav-link"} to="/">
                <div className="iconStyle">
                  <i class="gg-home-alt"></i>
                </div>
                Home
              </NavLink>
            </li> */}
            
            <li className="nav-item">
              <span className="iconStyle">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <NavLink className={"nav-link"} to="/">
                Home
              </NavLink>
            </li>
          


            {isLoggedIn() && role === "admin" && (
              <li className="nav-item">
                <NavLink className={"nav-link"} to="/register">
                  <span className="iconStyle">
                    <ion-icon name="person-circle-outline"></ion-icon>
                  </span>
                  Register
                </NavLink>
              </li>
            )}
            {!isLoggedIn() && (
              <li className="nav-item">
                <NavLink className={"nav-link"} to="/login">
                  <span className="iconStyle">
                    <ion-icon name="person-circle-outline"></ion-icon>
                  </span>
                  Login
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <span className="iconStyle">
                <ion-icon name="pricetags-outline"></ion-icon>
              </span>
              <NavLink className={"nav-link"} to="/assets">
                Assets
              </NavLink>
            </li>
          {isLoggedIn() &&
              (
            <li className="nav-item">
              {/* <button  onClick = {()=>handleLogout()}> */}
            <NavLink className={"nav-link"}  onClick={() => handleLogout()} to="/login">
              <span className="iconStyle">
                <ion-icon name="person-circle-outline"></ion-icon>
              </span>
             
               Logout 
            </NavLink>
            {/* </button> */}
          </li>)}
          </ul>
        </div>
      </nav>
    );
  } else if(isLoggedIn){
    return(
      <AssetHeader/>
    )
  }
};

export default Navbar;
