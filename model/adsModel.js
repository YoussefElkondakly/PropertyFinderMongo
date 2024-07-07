const mongoose = require("mongoose");
const adsSchema = mongoose.Schema({
  propertyType: {
    type: String,
    uppercase: true,
    required: [true, "Please Enter the Property Type "],
    enum: {
      values: ["VILLA", "HOUSE", "LAND", "APARTMENT"],
      message: "Please Insert a Correct Property Type",
    },
  },
  area: { type: String, required: [true, "please insert the area"] },
  city: { type: String, required: [true, "please insert a city name"] },
  price: { required: [true, "Please Input A good Price"], type: Number },
  district: { type: String, required: [true, "Please Input a district name"] },
  photo: { type: Array, required: [true, "please Add A property Image"] },
  agent: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    uppercase: true,

    enum: {
      values: ["SALE", "RENT"],
      message: "Please Insert a Correct Type",
    },
  },
  refreshedAt: { type: Date, default: Date.now },
});
adsSchema.pre(/^find/, function (next) {
  this.select("-__v");
  this.populate({
    path: "agent",
    select: "name phone _id",
  });
  next();
});
// adsSchema.pre('aggregate',async function(next){
// await this.populate({
//   path: "agent",
//   select: "name phone -_id",

// })
// next()
// })

const Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;
