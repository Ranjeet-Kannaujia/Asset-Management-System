const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  assetName: {
    type: String,
    required: true,
  },
  assetType: {
    type: String,
    enum: [
      "Plant & Machinary",
      "Computer & Peripheral",
      "Office Automation",
      "Furniture & Fixes",
      "Lab Equipments",
      "Others"
    ],
    required: true,
  },
  gemPortalNo: {
    type: String,
    required: true,
  },
  invoiceNo: {
    type: String,
    required: true,
    // unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  issuedTo: {
    type: String,
    required: true,
  },
  lab: {
    type: String,
    required: true,
  },
  floorNo: {
    type: String,
    enum: ["Ground Floor", "First Floor"],
    required: true,
  },
  purchasingDate: {
    type: Date,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
});

const Asset = new mongoose.model("Asset", assetSchema);

module.exports = Asset;
