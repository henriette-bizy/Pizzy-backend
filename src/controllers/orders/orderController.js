const { formatResult } = require("../../utils/formatResult");
const {validateObjectId} = require("../../utils/formatResult")
const {Order,OrderValidation} = require("../../models/orders/order")



exports.CreateOrder = async (req,res)=>{


    try{

        const body = req.body;
        console.log(body);
        const {error} = OrderValidation(req.body)


    }catch(error){
        res.send(formatResult({status:500, message:"Internal server error", data:error.message}))
    }





}
