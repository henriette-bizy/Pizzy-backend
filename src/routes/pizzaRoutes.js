
const express = require('express');
const {createPizza, getAllPizzas, getPizza, deleteAllPizzas, deletePizza} = require('../../src/controllers/pizza/pizzaController')
const {auth }= require('../middlewares/authentication')
const pizzaRoutes = express.Router();



pizzaRoutes.post('/pizza/', auth,createPizza);
pizzaRoutes.get('/pizza', getAllPizzas);
pizzaRoutes.get('/pizza/:id', getPizza);
pizzaRoutes.delete('/pizza/',deleteAllPizzas)
pizzaRoutes.delete('/pizza/:id',deletePizza)



module.exports = pizzaRoutes


