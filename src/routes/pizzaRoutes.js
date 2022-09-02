
const express = require('express');
const {createPizza, getAllPizzas, getPizza} = require('../../src/controllers/pizza/pizzaController')
const {auth }= require('../middlewares/authentication')
const pizzaRoutes = express.Router();



pizzaRoutes.post('/pizza/', auth,createPizza);
pizzaRoutes.get('/pizza', getAllPizzas);
pizzaRoutes.get('/pizza/:id', getPizza);



module.exports = pizzaRoutes


