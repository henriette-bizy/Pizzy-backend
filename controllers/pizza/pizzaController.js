const {Pizza,PizzaValidation}= require('../../models/pizza/pizza')


exports.createPizza = async(req,res)=>{

const body = req.body;
const {error} = PizzaValidation(body);

if(error)
 res.send(formatResult({status:400, message:"bad request"}))





}