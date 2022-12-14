const express = require('express');
const { celebrate, Joi, errors, Segments } = require('celebrate');
const {CreateOrder, GetAllOrders, deleteAllOrders, getOrder} =require('../controllers/orders/orderController')
const {auth }= require('../middlewares/authentication')
const orderRoutes = express.Router();


orderRoutes.post('/orders/',auth,CreateOrder);
orderRoutes.get('/orders/', auth,GetAllOrders)
orderRoutes.delete('/orders', deleteAllOrders)
orderRoutes.get('/orders/:id',celebrate({[Segments.PARAMS]:Joi.object().keys({
    id: Joi.string().alphanum(),
  })}),getOrder)


module.exports = orderRoutes;
