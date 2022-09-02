const  Joi = require("joi")
const { default: mongoose } = require("mongoose")


const OrderSchema = new mongoose.Schema({

orderStatus:{
    type:String,
    enum:['Pending','Completed','Canceled'],
    require:true
    
},
orderCustomerId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    require:true

},
orderItemId:{
    type:mongoose.Schema.ObjectId,
    ref:"Pizza",
    require:true
},

orderItemSize:{
    type:String,
    maxlength:250,
    require:true

}
},
{timestamps:true});




//validatin the user
exports.OrderValidation = (order)=>{
    const schema = Joi.object({
        orderStatus:Joi.string().required(),
        orderCustomerId:Joi.string().required(),
        orderItemId:Joi.string().max(50).required(),
        orderItemSize:Joi.required().required(),
    })
    return schema.validate(order);
}

const Order = mongoose.model('Order',OrderSchema)




exports.Order = Order;