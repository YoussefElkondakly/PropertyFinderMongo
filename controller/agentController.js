/**
 * 

router.post("/test", folder.uploadphoto('my data'), (req, res, next) => {
  console.log(req.file);
  const base = req.originalUrl
    .split("/")
    .filter((el) => {
      if (el === "matchingSystem" || el === "propertyFinder") return el;
    })
    .join("/");
  const picUrl = `${req.protocol}://${req.get("host")}/${base}/uploads/${
    req.file.filename
  }`;
  console.log(picUrl);
  res.end();
});
 */
const imageUpload = require("./../utils/imageUpload");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const Ads=require('./../model/adsModel')

exports.uploadImage= imageUpload.uploadPhoto("property")
exports.makeAd = catchAsync(async (req, res, next) => {
  const base = req.originalUrl
    .split("/")
    .filter((el) => {
      if (el === "matchingSystem" || el === "propertyFinder") return el;
    })
    .join("/");
  req.body.photo = `${req.protocol}://${req.get("host")}/${base}/uploads/${req.category?req.category+'/':''}${req.file.filename}`;
  req.body.agent=req.user.id
  
  const ad = await Ads.create(req.body);
  if (!ad) next(new AppError("Somthing wrong", 403));
  res.status(201).json({
    status: "success",
    data: ad,
  });
});
exports.getMyAds=catchAsync(async (req,res,next)=>{
  const ads=await Ads.find({agent:req.user.id})
  if (ads.length === 0)
    return next(new AppError("You Didn't add any ads Yet", 404));
    res.status(200).json({
  status:"success",
  data:ads
  })
});