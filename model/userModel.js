const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    phone:{
        type:Number,
        required:true,
        unique:true
    },
role:{
    type:String,
    required:true,
    enum:{
    values:['client','agent'],
    message:"The Roles Must Be Either Client or Agent"
    }
},
status:{
    type:Boolean,
    default:true
}

})
//the pre save middle ware is habbened between getting the data from input and save it to the dqata base 
//is modified is used to check if the password has is being updated or created
 
const User=mongoose.model('User',userSchema)
module.exports=User