const mongoose = require("mongoose");
/*
Area: Heliopolis
City: Cairo
District: Heliopolis district, Cairo Governorate
*/
const propertySchema = mongoose.Schema({
  propertyType: { type: String, required: true },
  area: {
    type: String,
    required: [true, "The Area Field is Required"],
  },
  price: { type: Number, required: [true,"The Price Field Is Required"] },
  city: {
    type: String,
    required: [true, "The City Field is Required"],
  },
  district: {
    type: String,
    required: [true, "The District Field is Required"],
  },
  refreshedAt:Date
  
});

const Property=mongoose.model('Property',propertySchema)