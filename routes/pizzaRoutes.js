
const express = require('express');
const {createPizza} = require('../controllers/pizza/pizzaController')
const pizzaRoutes = express.Router();



pizzaRoutes.post('/pizza/', createPizza);


return pizzaRoutes;

// module.exports = pizzaRoutes


