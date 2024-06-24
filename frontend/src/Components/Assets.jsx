import React, { useEffect, useState } from "react";
import AssetHeader from "./AssetHeader";
import QRCodeGenerator from "./QrCodeGenerator";
import * as XLSX from "xlsx";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import html2canvas from "html2canvas";
import { getUserRole } from "../utils/auth";
// import exportAssets from "../exportAssets/exportAssets";


const Assets = ({ assets }) => {
  const [assetsData, setAssetsData] = useState(assets);
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(getUserRole());
 

  const handleUpdateClick = (asset) => {
    console.log("Update clicked for asset ID:", asset);
    navigate(`/assets/${asset._id}`, { state: { asset } });
  };

  const handleDelete = async (assetId) => {
    if(getUserRole().role === "admin" ){
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this asset?"
      );
      if (userConfirmed) {
        setAssetsData((prevAssets) =>
          prevAssets.filter((asset) => asset._id !== assetId)
        );
        try {
          const response = await axios.delete(
            `http://localhost:9000/assets/${assetId}`
          );
          window.alert("Asset deleted");
          console.log(response);
        } catch (err) {
          console.log("Delete clicked for asset ID:", assetId);
          console.log(err);
          window.alert("something error")
        }
      }
    }else{
      console.log("Delete")
      window.alert ("you are not an authorized person to delete the asset");
    }
  };
  let sn = 1;
 return(
  <div>
    <div className="assetPage-container ">
      {/* <AssetHeader/> */}
    
   
    <div className="d-flex flex-column justify-content-between align-items-center">
      {}
      {/* Add Asset Form */}
      <h1>Asset List</h1>
     
      <div className="  d-flex vh-80 bg primary justify-content-center align-items-center">
        <div className="w-90 shadow-lg bg-white rounded p-3">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset Name</th>
                <th>Asset Category</th>
                <th>Invoice No</th>
                <th>Gem Portal No</th>
                <th>SupplierName</th>
                <th>Amount</th>
                <th>Floor No</th>
                <th>Issued To</th>
                <th>Update</th>
                <th>Delete</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{sn++}</td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.invoiceNo}</td>
                  <td>{asset.gemPortalNo}</td>
                  <td>{asset.supplierName}</td>
                  <td>{asset.amount}</td>
                  <td>{asset.floorNo}</td>
                  <td>{asset.issuedTo}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateClick(asset)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(asset._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {/* <QRCode value={JSON.stringify(asset)} /> */}
                    <QRCodeGenerator asset={asset} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
            
};

export default Assets;
