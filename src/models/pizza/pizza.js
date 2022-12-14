const  Joi = require("joi")
const { default: mongoose } = require("mongoose")

const PizzaSchema = new mongoose.Schema({

PizzaName:{
    type:String,
    maxlength:250,
    require:true
    
},
PizzaIngredients:{
    type:String,
    maxlength:100,
    require:true

},
PizzaPrice:{
    type:String,
    maxlength:250,
    require:true
},
PizzaImage:{
    type:String,
    maxlength:250,
    require:true

},
PizzaDimension:{
    type:String,
    maxlength:250,
},
},
{timestamps:true});




//validatin the user
exports.PizzaValidation = (pizza)=>{
    const schema = Joi.object({
        PizzaName:Joi.string(),
        PizzaIngredients:Joi.string().required(),
        PizzaPrice:Joi.string().max(50),
        PizzaImage:Joi.string().required(),
        PizzaDimension:Joi.string()
    })
    return schema.validate(pizza);
}

const Pizza = mongoose.model("Pizza", PizzaSchema)

exports.Pizza = Pizza;