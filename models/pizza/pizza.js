const  Joi = require("joi")
const { default: mongoose } = require("mongoose")
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({

PizzaName:{
    type:String,
    maxlength:250,
    required:true
    
},

PizzaDimensions:{
    type:String,
    maxlength:250,
    required:true
},
userPassword:{
    type:String,
    maxlength:250,
:true
},  
isAdmin:{
    type:Boolean,
    required:true
}},
{timestamps:true});


Joi.string();

//validatin the user
exports.UserValidation = (user)=>{
    const schema = Joi.object({
        userNames:Joi.string(),
        userEmail:Joi.string(),
        userPassword:Joi.string().max(50),
        isAdmin:Joi.required(),
    })
    return schema.validate(user);
}





exports.User = User;