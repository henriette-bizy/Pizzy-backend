const  Joi = require("joi")
const { default: mongoose } = require("mongoose")
const jwt = require("jsonwebtoken");

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



//generating the token
UserSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({
        _id:this._id,
        userNames:this.userNames,
        userEmail:this.userEmail,
        isAdmin:this.isAdmin
    },config.get('jwtPrivateKey'))
    return token;
}



//login validating
exports.logInValidtion = (user)=>{
    const validateLogin = Joi.object({
        email:Joi.string().email().max(255).min(4).required(),
        password:Joi.string().max(255).min(3).required()
    })
    return validateLogin.validate(body);
}

const User = mongoose.model("User",UserSchema);


exports.User = User;