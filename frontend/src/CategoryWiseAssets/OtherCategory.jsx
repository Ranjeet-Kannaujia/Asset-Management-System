import axios from "axios";
import React, { useState, useEffect } from "react";
import AssetPage from "../Pages/AssetPage";
import AssetHeader from "../Components/AssetHeader";
import Assets from "../Components/Assets";

const OtherCategory = () => {
  const [assets, setAssets] = useState([]);
  const category = "Others";
 
  useEffect(() => {
    const handleResponse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/assets/${category}`
        );
        setAssets(response.data);
      } catch (err) {
        console.log("Err in fetching furnitures", err);
      }
    };
    handleResponse();
  }, []);
  console.log(assets);
  return (
  <Assets assets= {assets}/>
  );
};

export default OtherCategory;
