const express = require('express');
const {CreateOrder} =require('../controllers/orders/orderController')
const {auth }= require('../middlewares/authentication')
const orderRoutes = express.Router();


orderRoutes.get('/orders/',auth,CreateOrder);



module.exports = orderRoutes;
