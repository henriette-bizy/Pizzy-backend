const  Joi = require("joi")
const { default: mongoose } = require("mongoose")


const UserSchema = new mongoose.Schema({

userNames:{
    type:String,
    maxlength:250,
    required:true
},

userEmail:{
    type:String,
    maxlength:250,
    required:true
},
userPassword:{
    type:String,
    maxlength:250,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now(),
},});


Joi.string();
exports.UserValidation = (user)=>{
    const schema = Joi.object({
        userNames:Joi.string(),
        userEmail:Joi.string(),
        userPassword:Joi.string().max(50)
    })
}
const User = mongoose.model("User",UserSchema);
exports.User = User;