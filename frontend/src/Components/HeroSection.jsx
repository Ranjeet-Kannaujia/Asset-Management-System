import React from "react";
import HeroBanner from "../assets/HeroBanner.png";
import "../css/HeroSection.css";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { isLoggedIn } from "../utils/auth";
const HeroSection = () => {
  return (
    <>
      <div className="HeroMain">
        <div className="mainText">
          <div className=" text">
            <p>Welcome to</p>
            <h1>Asset Manangement</h1>
          </div>
          {isLoggedIn() && (
            <div className="btn">
              <NavLink to="/assets">
                {" "}
                <button class="arrow-button">
                  Get Started<span class="arrow"></span>
                </button>
              </NavLink>
            </div>
          )}
           {!isLoggedIn() && (
            <div className="btn">
              <NavLink to="/login">
                {" "}
                <button class="arrow-button">
                  Get Started<span class="arrow"></span>
                </button>
              </NavLink>
            </div>
          )}
        </div>
        <div className="heroBannerMain">
          <img className="heroBanner" src={HeroBanner} alt="logo " />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
