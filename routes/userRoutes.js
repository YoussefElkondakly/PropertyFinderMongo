const express =require('express');
const authController=require('./../controller/authController')
const router = express.Router()
//managing all the auth routes 
router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.patch('/updatePassword',authController.protect,authController.updatePassword)
router.patch('/updateMe',authController.protect,authController.updateMe)

module.exports = router