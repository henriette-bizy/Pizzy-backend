const { formatResult } = require("../../utils/formatResult");
const { validateObjectId } = require("../../utils/formatResult");
const { Order, OrderValidation } = require("../../models/orders/order");

exports.CreateOrder = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { error } = OrderValidation(body);
    if (error) {
      res.send(
        formatResult({
          status: 400,
          message: "bad request",
          data: error.message,
        })
      );
    }

    let newOrder = new Order(body);
    await newOrder.save();
    res.send(
      formatResult({
        status: 200,
        message: "order has been placed",
        data: body,
      })
    );
  } catch (error) {
    res.send(formatResult({ status: 500, message: error.message }));
  }
};
exports.getOrder = async (req, res) => {
  try {
    let { id } = req.params;
    if (!validateObjectId(id))
      return res.send(formatResult({ status: 204, message: "Invalid id" }));

    let order = await Order.findOne({ _id: id });
    if (!order) {
      res.send(formatResult({ status: 404, message: "order not found" }));
    }
    res.send(
      formatResult({
        status: 200,
        message: "order successfully retrieved",
        data: order,
      })
    );
  } catch (error) {
    return res.send(
      formatResult({
        status: 500,
        message: "Internal server error",
        data: error.message,
      })
    );
  }
};
exports.GetAllOrders = async (req, res) => {
  try {
    let { limit, page } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;

    if (page < 1)
      return res.send(
        formatResult({
          status: 400,
          message: "Page query must be greater than 0",
        })
      );

    const options = {
      page: page,
      limit: limit,
    };

    const orders = await Order.paginate({}, options);
    res.send(
      formatResult({
        data: orders,
      })
    );
  } catch (error) {
    res.send(formatResult({ status: 500, message: error.message }));
  }
};

exports.deleteAllOrders = async (req, res) => {
  try {
    let orders = await Order.deleteMany();
    if (!orders) {
      return res.send(formatResult({ status: 400, message: "bad request" }));
    }
    return res.send(
      formatResult({ status: 200, message: "succesfully deleted all orders" })
    );
  } catch (error) {
    res.send(
      formatResult({
        status: 500,
        message: "Internal server error",
        data: error.message,
      })
    );
  }
};
exports.deleteOrder = async (req,res)=>{
  try{
    
    let {id} = req.params;
    let order = await Order.findOneAndDelete({_id:id});

    if(!order){
      res.send(formatResult({status:404,message:"Order is not found"}))
    }
    res.send(formatResult({status:400, message:"bad request"}))

  }catch(error){
    res.send(formatResult({status:500, message:"internal server error",data:error.details}))
  }
}