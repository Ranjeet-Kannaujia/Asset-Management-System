import React, { useEffect, useState } from "react";
import '../css/AssetForm.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssetForm = ({ isUpdate, assetToUpdate }) => {
  const navigate = useNavigate();

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
    lab: "",
  });
  console.log(isUpdate, assetToUpdate);
  // Pre-fill form data when in "update" mode
  useEffect(() => {
    if (isUpdate && assetToUpdate) {
      setFormData({
        assetName: assetToUpdate.assetName,
        assetType: assetToUpdate.assetType,
        invoiceNo: assetToUpdate.invoiceNo,
        purchasingDate: assetToUpdate.purchasingDate,
        supplierName: assetToUpdate.supplierName,
        amount: assetToUpdate.amount,
        gemPortalNo: assetToUpdate.gemPortalNo,
        issuedTo: assetToUpdate.issuedTo,
        floorNo: assetToUpdate.floorNo,
        lab: assetToUpdate.lab,
      });
    }
  }, [isUpdate, assetToUpdate]);

  //state variables for selected floor and lab options
  const [selectedFloor, setSelectedFloor] = useState(formData.floorNo);
  const [availableLabs, setAvailableLabs] = useState([]);

  // Fetch available labs when the selected floor changes
  useEffect(() => {
    if (selectedFloor === "Ground Floor") {
      //  available labs for Ground Floor
      setAvailableLabs(["GF01(A)Conference room", "GF01(B)", "GF01(C)", "GF04", "GF06", "GF07", "GF10(A)", "GF10(B)", "GF11", "GF12"]);
    } else if (selectedFloor === "First Floor") {
      //  available labs for First Floor
      setAvailableLabs(["FF01", "FF04(A)", "FF04(B)", "FF05(A-C)", "FF05(D)", "FF05(E)"]);
    } else {
      // Clear the lab options if no floor is selected
      setAvailableLabs([]);
      // window.alert("Choose Floor No first");
    }
  }, [selectedFloor]);

  //take  input into form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "floorNo") {
      setSelectedFloor(value); // Update the selected floor
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Update formData with the selected floor
      }));
    } else {
      // For other fields, update formData as usual
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(window.confirm("Should it be added now?")){
        if (isUpdate) {
          //update request using axios
          const response = await axios.put(
            `http://localhost:9000/assets/${assetToUpdate._id}`,
            formData
          );
          window.alert("Data updated succesfully");
          console.log(response);
        } else {
          //add request using axios
          const response = await axios.post(
            "http://localhost:9000/assets",
            formData
          );
          window.alert("Data added successfully");
          console.log(response);
        }

      }
      // Redirect to the assets page after submission
      navigate("/assets");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mainWrapper">
      <div className="wrapper2">
        <div className="form-box entry">
          <h2>Enter Details</h2>
          <form onSubmit={handleSubmit}>
          <div className="select-section">
            <div className="selectCategory">
              <label for="assetType">Choose a category:</label>
              <select
                required
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
              >
                <option name="assetType" value="">
                  Select
                </option>
                <option value="Computer & Peripheral">
                  Computer & Peripheral
                </option>
                <option value="Furniture & Fixes">Furniture & Fixes</option>
                <option value="Lab Equipments">Lab Equipments</option>
                <option value="Office Automation">Office Automation</option>
                <option value="Plant & Machinary">Plant & Machinary</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="date">
              <label for="purchasingDate">Date of purchase:</label>
              <input
                type="date"
                required
                name="purchasingDate"
                value={formData.purchasingDate}
                onChange={handleChange}
              ></input>
            </div>
           </div>
            <div className="input-box">
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                required
              />
              <label htmlFor="supplierName"> Name of supplier</label>
            </div>

            <div className="input-box">
              <input
                type="text"
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
                required
              />
              <label htmlFor="assetName">Item Name</label>
            </div>

            <div className="input-box">
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
              <label htmlFor="">Amount</label>
            </div>

            <div className="input-box">
              <input
                type="text"
                name="gemPortalNo"
                value={formData.gemPortalNo}
                onChange={handleChange}
                required
              />
              <label htmlFor="gemPortalNo"> Ref. NO. /Gem-Contract No.</label>
            </div>

            <div className="input-box">
              <input
                type="text"
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={handleChange}
                required
              />
              <label htmlFor="invoiceNo"> Invoice No.</label>
            </div>

            <div className="input-box">
              <input
                type="text"
                name="issuedTo"
                value={formData.issuedTo}
                onChange={handleChange}
                required
              />
              <label htmlFor="issuedTo"> Issued To.</label>
            </div>
            {/* <div className="select-section">  */}
            <div className="selectCategory">
              <label for="floorNo">Assigned at Floor:</label>
              <select
                required
                name="floorNo"
                value={formData.floorNo}
                onChange={handleChange}
              >
                <option value="">Select Floor</option>
                <option value="Ground Floor">Ground Floor</option>
                <option value="First Floor">First Floor</option>
              </select>
            </div>

            <div className="selectCategory">
              <label htmlFor="lab">Lab/Section</label>
              <select
                name="lab"
                value={formData.lab}
                onChange={handleChange}
                required
              >
                <option value="">Select Lab</option>
                {availableLabs.map((lab) => (
                  <option key={lab} value={lab}>
                    {lab}
                  </option>
                ))}
              </select>
            </div>
            {/* </div> */}

            {/* <div className="upload">
                <label for="file">Upload Invoice : </label>
                    <input id="file" type="file" />
                    
                </div>
                <button type='submit' className='btn2-upload'> Upload</button>   */}
           <div  >
            <button type="submit" className="btn2-submit">
              {" "}
              Submit
            </button>

          </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetForm;
