const  Joi = require("joi")
const  {mongoose } = require("mongoose")

const PizzaSchema = new mongoose.Schema({

PizzaName:{
    type:String,
    maxlength:250,
    required:true
    
},
PizzaIngredients:{
    type:String,
    maxlength:100,
    required:true

},
PizzaPrice:{
    type:String,
    maxlength:250,
    required:true
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
        PizzaIngredients:Joi.string(),
        PizzaPrice:Joi.string().max(50),
        PizzaImage:Joi.required(),
    })
    return schema.validate(pizza);
}
const Pizza = mongoose.model("Pizza", PizzaSchema)


exports.Pizza = Pizza;