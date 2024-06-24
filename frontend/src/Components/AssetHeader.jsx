import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import NileitLogo from "../assets/NileitLogo.jpg";
import axios from "axios";
import AssetForm from "./OldAssetForm";
import "../css/AssetHeader.css"
import { getUserRole } from "../utils/auth";

const AssetHeader = () => {
  const navigate = useNavigate(); 
  
const handleLogout = ()=>{
 if(window.confirm("Are you sure you want to logout?")){
   localStorage.removeItem('userAuth');
   navigate("/login");
   console.log("logged Out");
 }
 console.log("Not sure to logout")
}
  return (
  
     
     <nav> 
    {/* // <div className="asset-links-wrapper">
         {/* <div className="links">
         <Link to="/">Home</Link>
        </div> */}
        <div className = "asset-links"> 
         <div className="links">
           <Link to="/assetForm">Add Asset</Link>
       </div>
       
         <div className="links">
        <Link to="/assets/Furniture-and-Fixes">Furniture & Fixes</Link>
         </div>
         <div className="links">
         <Link to="/assets/Lab-Equipments">Lab Equipments</Link>
       </div>

       <div className="links">
         <Link to="/assets/Office-Automation">Office Automation</Link>
      </div>
         <div className="links">
          <Link to="/assets/Plant-and-Machinary">Plant & Machinary</Link>
         </div>
        
         <div className="links">
           <Link to="/assets/Computer-and-Peripheral">Computer & Peripherral</Link>
         </div> 
         <div className="links">
          <Link to="/assets/Others">Others</Link>
         </div>
         
       <div className=".logout">
           <button  className="btn btn-danger" onClick = {()=>handleLogout()}>Logout</button> 
         <p> ({getUserRole().role})  </p>
         {/* <p>{getUserRole().username}</p> */}
         </div> 
       
       </div>
      {/* // </div> */}
   </nav> 
  


  );
};

export default AssetHeader;
