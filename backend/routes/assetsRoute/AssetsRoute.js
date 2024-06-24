const express = require("express");
const {
  createAssetController,
  fetchAllAssetController,
  fetchAssetContoller,
  updateAssetContoller,
  deleteAssetContoller,
  fetchOneAssetController,
  getAssetFormController,
} = require("../../controllers/assetsController/AssetsController");
// const mongoose = require('mongoose');
// const Asset = require('../model/Asset');
const assetsRoute = express.Router();
const protected = require('../../middleware/protected')

//  Route MiddleWare

//getAssetForm
assetsRoute.get('/assetForm', getAssetFormController);

// create assets   
assetsRoute.post("/assets", createAssetController);


//Fetch all assets
assetsRoute.get("/assets", fetchAllAssetController);


//fetch category wise assets
assetsRoute.get("/assets/:category", fetchAssetContoller);


//fetch one asset
assetsRoute.get("/assets/:id", fetchOneAssetController);

//update assets
assetsRoute.put("/assets/:id", updateAssetContoller);

//delete assets
assetsRoute.delete("/assets/:id", deleteAssetContoller);


module.exports = assetsRoute;
