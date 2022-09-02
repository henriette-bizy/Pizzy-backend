const { Pizza, PizzaValidation } = require("../../models/pizza/pizza");
const { formatResult } = require("../../utils/formatResult");
const {validateObjectId} = require("../../utils/formatResult")

exports.createPizza = async (req, res) => {
  try {
    const body = req.body;

    const { error } = PizzaValidation(body);
    if (error) {
      res.send(
        formatResult({
          status: 400,
          message: "bad request",
          data: error.message,
        })
      );
    }

    let newPizza = new Pizza(body);

    await newPizza.save();
    res.send(
      formatResult({
        status: 201,
        message: "new pizza created",
        data: newPizza,
      })
    );
  } catch (error) {
    res.send(formatResult({ status: 400, message: error }));
  }
};


exports.getAllPizzas = async (req,res) =>{


  try{

  const pizzas = await Pizza.find();
  res.send(formatResult({status:200, message:"List of the pizzas", data:pizzas}))

  }catch(error){

    res.send(formatResult({status:500, message:"Something is wrong", data:error.message}))
    
  }
}


exports.getPizza = async (req, res) => {
  try {
  
  let {id} = req.params
   console.log(id);
      
    if (!validateObjectId(id))
      return res.send(formatResult({ status: 204, message: "Invalid id"}));

    const pizza = await Pizza.findOne({ _id: id });
    

    if (!pizza) {
      return res.send(formatResult({ status: 404, message: "pizza not found" }));
    }

    return res.send(
      formatResult({ status: 200, message: "sucess", data: pizza })
    );
  } catch (error) {
    res.send(formatResult({status:"500", message:error.message}))
  }
  // this is to let you know that id was deprecated in the object
}

exports.updatePizza =  async (req,res) =>{
  try {
  
    let {id} = req.params
    const body = req.body;
     console.log(id);
        
      if (!validateObjectId(id))
        return res.send(formatResult({ status: 204, message: "Invalid id"}));
  
      const pizza = await Pizza.findOne({ _id: id });
      
  
      if (!pizza) {
        return res.send(formatResult({ status: 404, message: "pizza not found" }));
      }
  

      const updatedPizza = await Pizza.findOneAndUpdate({ _id: id }, body);
      return res.send(
        formatResult({ status: 200, message: "sucess", data: updatedPizza })
      );
    } catch (error) {
      res.send(formatResult({status:"500", message:error.message}))
    }
}
