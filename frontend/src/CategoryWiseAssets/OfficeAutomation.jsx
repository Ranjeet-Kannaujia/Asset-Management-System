import React, { useEffect, useState } from "react";
import Assets from "../Components/Assets";
import axios from "axios";

const OfficeAutomation = () => {
  const [assets, setAssets] = useState([]);
  const category = "Office Automation";

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
  return <Assets assets={assets} />;
};

export default OfficeAutomation;
