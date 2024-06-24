const express = require("express");
const homeRoute = express.Router();
const QRCode = require("qrcode");

//Home route
homeRoute.get("/", async (req, res, next) => {
    // const options = {}; 
    // const object = {
    //   // You can customize the QR code size, margin, error correction level, etc. here
    //   name: "Sheerie",
    //   age: 23,
    //   address: "Gonda",
      
    // };
  
  
    // const objectData = JSON.stringify(object);  
    // await QRCode.toDataURL(objectData, options, (err, url) => {
    //   try {
    //     // res.sendFile( __dirname + "/public/qr.html" );
    //     console.log(url);
    //   } catch (err) {
    //     res.json(err);
    //     console.log(err);
    //   }
    
    // });
    res.json({msg: "welcome"});

  });


  module.exports = homeRoute;