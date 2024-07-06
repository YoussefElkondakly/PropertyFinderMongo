const mongoose = require("mongoose");
/*
Area: Heliopolis
City: Cairo
District: Heliopolis district, Cairo Governorate
district, price, and area
*/
const requestSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: [
      true,
      "Please Type what is the maximum price you can provide or buy",
    ],
  },
  area: {
    type: String,
    required: [true, "you Need To provide the area of the property"],
  },
  district: {
    type: String,
    required: [true, "you Need To provide the district of the property"],
  },
  //Non required with requests
    propertyType: {
    type: String,
    uppercase: true,
 enum: {
      values: ["VILLA", "HOUSE", "LAND", "APARTMENT"],
      message: "Please Insert a Correct Property Type",
    },
  }, 
  description: String,
  city: String,
  note: String,
  status: {
    type: Boolean,
    default: false,
  },
  refreshedAt:{
    type: Date,
    default: Date.now
  }
});
requestSchema.pre(/^find/,function(next){
  this.populate({
    path: "client",
    select: "name phone -_id",
    });
    next();
})
const RequestAd = mongoose.model("RequestAd", requestSchema);
module.exports = RequestAd;
