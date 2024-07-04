const express = require("express");
const authController = require("./../controller/authController");
const clientController = require("./../controller/clientController");

const router = express.Router();
router.use(authController.protect, authController.accessManager("client"));
router.get("/getAds", clientController.getAds);
router.get("/getAds/viewMatchAds", clientController.viewMatchAds);
router.get('/getAds/:adId',clientController.getAd)
router.post("/getAds/makeRequest",authController.isVerified,clientController.postRequest);
//Will Make The one User Only Make one Request

module.exports=router 