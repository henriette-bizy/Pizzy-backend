const { celebrate, Segments,error,Joi, errors } = require('celebrate');
const express = require('express');
const {createPizza, getAllPizzas, getPizza, deleteAllPizzas, deletePizza} = require('../../src/controllers/pizza/pizzaController')
const {auth }= require('../middlewares/authentication')
const pizzaRoutes = express.Router();



pizzaRoutes.post('/pizza/', auth,createPizza);
pizzaRoutes.get('/pizza', getAllPizzas);
pizzaRoutes.get('/pizza/:id', celebrate({[Segments.PARAMS]:Joi.object().keys({
    id: Joi.string().alphanum(),
  })}),getPizza);
pizzaRoutes.delete('/pizza/',deleteAllPizzas)
pizzaRoutes.delete('/pizza/:id',celebrate({[Segments.PARAMS]:Joi.object().keys({
    id: Joi.string().alphanum(),
  })}),deletePizza)



module.exports = pizzaRoutes


