const express = require('express');
const {CreateOrder, GetAllOrders, deleteAllOrders} =require('../controllers/orders/orderController')
const {auth }= require('../middlewares/authentication')
const orderRoutes = express.Router();


orderRoutes.post('/orders/',auth,CreateOrder);
orderRoutes.get('/orders/', auth,GetAllOrders)
orderRoutes.delete('/orders', deleteAllOrders)


module.exports = orderRoutes;
