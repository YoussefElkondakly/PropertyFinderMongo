const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");

const crypto = require("crypto");
const AppError = require("../utils/appError");

exports.getMyProfile=catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user._id);
    if(!user)return next(new AppError("User Not found",404))
    res.status(200).json({
        status:"success",
        data: {
            user
            }
            });
});
exports.updateProfile=catchAsync(async (req,res,next)=>{
    if (req.body.password|| req.body.confirmPassword||req.body.phone)return next(new AppError("You Cant Update Password and phone Here",400))
    const user = await User.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators
        :true})
        //prevent 
        if(!user)return next(new AppError("User Not found",404))
            res.status(200).json({
        status:"success",
        data: {
            user
            }
            });
})

exports.updatePassword=catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user._id).select("+password");
    if(!user)return next(new AppError("User Not found",404))
        if(!req.body.newPassword )return next(new AppError("Password does not match ",400))
           const checkOldPassword = await user.checkPassword(
             req.body.password,
             user.password
           );
    if(checkOldPassword)return next(new AppError("Please make sure you typed The Correct Password"))      
    user.password = req.body.newPassword;
        user.confirmPassword = req.body.confirmPassword;
            await user.save();
            res.status(200).json({
                status:"success",
                data: {
                    user
                    }
                    });
})