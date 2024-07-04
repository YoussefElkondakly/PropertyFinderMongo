// const imageUpload = require("./../utils/imageUpload");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const Ads = require("./../model/adsModel");
const RequestAd = require("./../model/requestModel");
exports.getAds = catchAsync(async (req, res, next) => {
  const ads = await Ads.find();
  if (ads.length === 0) return next(new AppError("No Ads Right Now", 404));

  res.status(200).json({
    status: "success",
    data: ads,
  });
});

exports.getAd = catchAsync(async (req, res, next) => {
  const ad = await Ads.findOne({ _id: req.params.adId });
  if (ad.length === 0) return next(new AppError("No Ads Right Now", 404));

  res.status(200).json({
    status: "success",
    data: ad,
  });
});
//POST REQUEST
exports.postRequest = catchAsync(async (req, res, next) => {
  const makeRequest = await RequestAd.create({client:req.user.id,...req.body});
  if (!makeRequest)
    return next(new AppError("There is A problem Sending The Ad", 401));

  res.status(200).json({
    status: "success",
    data: makeRequest,
  });
  // res.end()
});
exports.viewMatchAds=catchAsync(async (req,res,next)=>{
    const request = await RequestAd.findOne({_id:'6686c586cafd42b4ef60400d'});
if(!request) return next(new AppError("No Request Found",404));
console.log(request)
const ads = await Ads.aggregate([
  {
    $match: { price: { $lte: request.budget },type:request.type,propertyType:request.propertyType, },
  }
]);
if(ads.length===0)
  return next(new AppError("No Ads Found at this moment",404));
res.status(200).json({
  status: "success",
  data: ads,
})
});
//in this controller you are an official verified client
//you have in the request the params of the requested property's Id and your user Id that will be linked
//to the ad
//you have in the request body that have a message to the agent
/**
   * I want Make A productrequest {
   * PropertyId
   * clientId 
   * message
   * refresh
   * }
     * {
  data: [{
    name: XXX,
    role: XXX,
    ...other user data,
    adsCount: 0,
    totalAdsAmount: 0,
    requestsCount: 10,
    totalRequestsAmount: 23600,
  }],
  page: 1,
  limit: 10
  total: 200
  hasNextPage: true
  hasPreviousPage: false
}
     */
