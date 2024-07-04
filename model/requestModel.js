const mongoose = require("mongoose");
/*
Area: Heliopolis
City: Cairo
District: Heliopolis district, Cairo Governorate
*/
const requestSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  propertyType: {
    type: String,
    uppercase: true,
    required: [true, "Please Enter the Property Type "],
    enum: {
      values: ["VILLA", "HOUSE", "LAND", "APARTMENT"],
      message: "Please Insert a Correct Property Type",
    },
  },
  type: {
    type: String,
    required: [true, "Please Type do you want to buy or rent"],
    uppercase: true,

    enum: {
      values: ["SALE", "RENT"],
      message: "Please Give me which Type of owning a property do you want",
    },
  },
  budget: {
    type: Number,
    required: [
      true,
      "Please Type what is the maximum price you can provide or buy",
    ],
  },
  area: String,
  city: String,
  note: String,
  status:{
    type: Boolean,
    default: false
  },
});

const RequestAd = mongoose.model("RequestAd", requestSchema);
module.exports = RequestAd;
