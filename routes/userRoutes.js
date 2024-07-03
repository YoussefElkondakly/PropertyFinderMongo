const express =require('express');
const authController=require('./../controller/authController')
const agentController=require('./../controller/agentController')
const router = express.Router()
router.use(authController.protect)
router.get("/logout", authController.logout);
//managing all the auth routes 
router.get('/myprofile',agentController.getMyProfile)
router.patch('/updateProfile',agentController.updateProfile)
router.patch('/updatePassword',agentController.updatePassword)
module.exports = router