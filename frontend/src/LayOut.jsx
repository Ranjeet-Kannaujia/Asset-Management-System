import React from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AboutUs from "./Pages/AboutUs";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import AssetPage from "./Pages/AssetPage";
import AssetForm from "./Components/AssetForm";
import FurnituresCategory from "./CategoryWiseAssets/FurnituresCategory";
import ComputersCategory from "./CategoryWiseAssets/ComputersCategory";
import OtherCategory from "./CategoryWiseAssets/OtherCategory";
import OfficeAutomation from "./CategoryWiseAssets/OfficeAutomation";
import MachinaryCategory from "./CategoryWiseAssets/MachinaryCategory";
import LabEquipments from "./CategoryWiseAssets/LabEquipments";
import UpdateAsset from "./Pages/UpdateAssetPage";
import ProtectedRegister from "./route-guard/ProtectedRegister";
import { isLoggedIn } from "./utils/auth";
const LayOut = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<ProtectedRegister component={Register} />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/assets" element={<ProtectedRegister component={AssetPage} />} />
        <Route
          path="/assetForm"
          element={<ProtectedRegister component={AssetForm} />}
        />
        <Route
          path="/assets/Furniture-and-Fixes"
          element={<ProtectedRegister component={FurnituresCategory} />}
        />
        <Route
          path="/assets/Lab-Equipments"
          element={<ProtectedRegister component={LabEquipments} />}
        />
        <Route
          path="/assets/Office-Automation"
          element={<ProtectedRegister component={OfficeAutomation} />}
        />
        <Route
          path="/assets/Plant-and-Machinary"
          element={<ProtectedRegister component={MachinaryCategory} />}
        />
        <Route
          path="/assets/Computer-and-Peripheral"
          element={<ProtectedRegister component={ComputersCategory} />}
        />
        <Route
          path="/assets/Others"
          element={<ProtectedRegister component={OtherCategory} />}
        />
        <Route
          path="/assets/:assetId"
          element={<ProtectedRegister component={UpdateAsset} />}
        />
        {/* <PrivateRoute path="/assets" element={<AssetPage />} /> */}
        <Route path="*" element={<ProtectedRegister component={Home} />} />
      </Routes>
    </div>
  );
};

export default LayOut;
