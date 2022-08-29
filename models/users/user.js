const  Joi = require("joi")
const { default: mongoose } = require("mongoose")
const jwt = require("jsonwebtoken");
const { ONE_DAY } = require('../../utils/formatResult')
const paginate = require('mongoose-paginate-v2')
require('dotenv').config()

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
isAdmin:{
    type:Boolean,
    required:true
}},
{timestamps:true});

UserSchema.plugin(paginate)

//validating the user
exports.UserValidation = (user)=>{
    const schema = Joi.object({
        userNames:Joi.string(),
        userEmail:Joi.string(),
        userPassword:Joi.string().max(50),
        isAdmin:Joi.required(),
    })
    return schema.validate(user);
}


//generating the token
UserSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({
        _id:this._id,
        userNames:this.userNames,
        userEmail:this.userEmail,
        isAdmin:this.isAdmin
    }, process.env.KEY, {
        expiresIn: ONE_DAY
    })
    return token;
}


exports.validateParams = (requestParams) =>{
    const validateParams = Joi.object({
        requestParams:Joi.string().max(80).min(1).required()
    })

    return validateParams.validate(requestParams)
}



//login validating
exports.logInValidating = (user)=>{
    const validateLogin = Joi.object({
        userEmail:Joi.string().email().max(255).min(4).required(),
        userPassword:Joi.string().max(255).min(3).required()
    })
    return validateLogin.validate(user);
}




const User = mongoose.model("User",UserSchema);


exports.User = User;