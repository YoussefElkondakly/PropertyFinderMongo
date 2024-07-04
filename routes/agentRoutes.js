const express = require("express");
const authController = require("./../controller/authController");
const agentController = require("./../controller/agentController");

const router = express.Router();
router.use(authController.protect, authController.accessManager("agent"));
router.post('/makeAd',authController.isVerified,agentController.uploadImage,agentController.makeAd)
router.get("/getMyAds",agentController.getMyAds);
module.exports=router