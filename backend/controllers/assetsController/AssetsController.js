const Asset = require("../../model/Asset");
const QRCode = require("qrcode");

const getAssetFormController = async (req, res)=>{
    try{
       res.json({msg : "Assets form opened"})
    }catch(err){
      console.log(err)
    }
}

// code to create an Asset using Asset model
const createAssetController = async (req, res) => {
  //data coming from req header
  const {
    assetName,
    assetType,
    gemPortalNo,
    invoiceNo,
    amount,
    issuedTo,
    floorNo,
    purchasingDate,
    supplierName,
    lab
  } = req.body;

  const assetDetail = {
    assetName,
    assetType,
    gemPortalNo,
    invoiceNo,
    amount,
    issuedTo,
    floorNo,
    purchasingDate: new Date(),
    supplierName,
    lab
  };

  //create assets using Asset model
  Asset.create(assetDetail)
    .then(() => {
      console.log("created successfully");
      res.json("created");
    })
    .catch((err) => console.log(err));

  // Generate QR code for assetDetail
  // const options = {};
  // const assetData = JSON.stringify(assetDetail);
  // QRCode.toDataURL(assetData, options, (err, url) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: "QR code generation failed" });
  //   }

  //    // Send the QR code image URL along with success message
  //    res.status(201).json({
  //     message: "Asset created successfully",
  //     // qrImageUrl: qrImageUrl,
  //   });
  // });
};

//GET:- fetch  All the assets created into db
const fetchAllAssetController = async (req, res) => {
  const AssetData = await Asset.find();
  console.log(AssetData);

  try {
    console.log("all assets are here");
    res.json({
      AssetData,
    });
  } catch (err) {
    res.json(err);
  }
};

//category:- fetch assets by its category
const fetchAssetContoller = async (req, res) => {
  const category = req.params.category;
  const assetFound = await Asset.find({ assetType: category });
  console.log(assetFound);

  try {
    res.json(assetFound);
  } catch (err) {
    res.json({ msg: err.message });
  }
};

//fetch one asset Controller: One asset fetched by id
const fetchOneAssetController = async (req, res) => {
  const assetId = req.params.id;
  try {
    const assetFound = await Asset.findOne({ _id: ObjectId(assetId) }); // Wait for the query to execute
    if (assetFound) {
      res.json({ msg: "Asset found", asset: assetFound });
    } else {
      res.status(404).json({ msg: "Asset not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error fetching asset", error: error.message });
  }
};

//PUT:- update the asset data
const updateAssetContoller = async (req, res) => {
  ///get the id
  const assetId = req.params.id;
  const updatedData = req.body; // The data you want to update

  try {
    // Update the asset in the database and return the updated document
    const updatedAsset = await Asset.findByIdAndUpdate(assetId, updatedData, {
      new: true,
    });

    if (!updatedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE:- Delete assets
const deleteAssetContoller = async (req, res) => {
  const assetId = req.params.id;
console.log(assetId);
  try {
    // Delete the asset from the database
    const deletedAsset = await Asset.findByIdAndDelete(assetId);

    if (!deletedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAssetFormController,
  createAssetController,
  fetchAssetContoller,
  fetchAllAssetController,
  fetchOneAssetController,
  updateAssetContoller,
  deleteAssetContoller,
};
