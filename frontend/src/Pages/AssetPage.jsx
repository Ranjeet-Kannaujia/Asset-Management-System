import React, { useState, useEffect } from "react";
// import AssetForm from "../Components/OldAssetForm";
import axios from "axios";
import AssetHeader from "../Components/AssetHeader";
import { useNavigate } from "react-router-dom";
import Assets from "../Components/Assets";
import { isLoggedIn } from "../utils/auth";

function AssetPage() {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();
  const isLogIn = isLoggedIn();

  //WE ARE PROTECTING THE ROUTE AT THE VERY START: OTHERWISE THIS USEFFECT CAN ALSO BE USED TO PROTECT
  useEffect(() => {
    async function fetchData() {

      // Fetch asset details from your backend API
      if (isLogIn) {
        await axios
          .get(
            "http://localhost:9000/assets"
          )
          .then((response) => {
            // // Handle the response, e.g., update state with fetched assets
            setAssets(response.data.AssetData);
            console.log(response);
          })
          .catch((error) => {
            console.error("Error fetching assets:", error);
          });
      } else {

        navigate("/login");

      }
    }
    fetchData();
  }, [isLogIn]);

  return <Assets assets={assets} />;
}

export default AssetPage;
