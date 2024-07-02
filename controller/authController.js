const jwt=require('jsonwebtoken')
const User=require('./../model/userModel')
// const catchAsyncError=require('./../utils/catchAsyncError')
// const AppError=require('./../utils/appError')
const sendJsonResponseToken=function(data){
    //remember to change the data
   const token= jwt.sign(data)
res.status(data).json({
    status:'success',
    token
})
}
exports.protect=(req,res,next)=>{
    console.log("here Will Check if the user is logged in")
    next()
}
exports.signup=async (req,res,next)=>{
const{name ,phone,role}=req.body
const newUser=await User.create({name,phone,role})
}
exports.login=(req,res,next)=>{

}
exports.updatePassword=(req,res,next)=>{
    
}
exports.updateMe=(req,res,next)=>{
    
}