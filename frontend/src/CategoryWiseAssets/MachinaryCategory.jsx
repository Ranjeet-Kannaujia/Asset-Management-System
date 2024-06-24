import React, { useEffect, useState } from 'react'
import Assets from '../Components/Assets';
import axios from 'axios';

const MachinaryCategory = () => {
    const [assets, setAssets] = useState([]);
  const category  = "Plant & Machinary";
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
  return (
    <Assets assets = {assets}/>
  )
}

export default MachinaryCategory