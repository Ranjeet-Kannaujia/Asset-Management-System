import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom'
import "../css/AssetForm.css";
import "bootstrap/dist/css/bootstrap.css";
import "../css/Login.css";
import axios from "axios";

const AssetForm = () => {
  // const location = useLocation();

  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "",
    invoiceNo: "",
    purchasingDate: "",
    supplierName: "",
    amount: "",
    gemPortalNo: "",
    issuedTo: "",
    floorNo: "",
  });

  //take  input into form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get( "http://localhost:9000/assets");
      const response = await axios.post(
        "http://localhost:9000/assets",
        formData
      );
      console.log(response);
      window.location.href = "/assets";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainWrapper">
      {/* <h2>Assets Page</h2> */}

      <div className="wrapper2">
        <form onSubmit={handleSubmit}>
          <h3>Asset Form</h3>
          <div>
            <label>
              Asset Name:
              <br />
              <input
                type="text"
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Asset Category:
              <select
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
              >
                {/* <option name="assetType" value="">
                  Select
                </option> */}
                <option value="Plant & Machinery">Plant & Machinary</option>
                <option value="Computer & Peripheral">
                  Computer & Peripheral
                </option>
                <option value="Office Automation">Office Automation</option>
                <option value="Furniture & Fixes">Furniture & Fixes</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Purchasing Date
              <input
                type="text"
                name="assetName"
                value={new Date()}
                // onChange = {handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Invoice no:
              <br />
              <input
                type="text"
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Gem portal no:
              <br />
              <input
                type="text"
                name="gemPortalNo"
                value={formData.gemPortalNo}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Amount
              <br />
              <input
                name="amount"
                value={formData.amount}
                type="text"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Issued to:
              <br />
              <input
                type="text"
                name="issuedTo"
                value={formData.issuedTo}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Floor No:
              <select
                name="floorNo"
                value={formData.floorNo}
                onChange={handleChange}
              >
                <option name="floorNo" value="">
                  Select
                </option>
                <option value="Ground Floor">Ground Floor</option>
                <option value="First Floor">First Floor</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Supplier Name:
              <br />
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* ... Other form fields */}
          <div>
            <button type="submit">Submit</button>
          </div>
          <div>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;
