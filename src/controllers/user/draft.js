const Joi = require('Joi')
const {error, value} = Joi.number().validate(2);
console.log(`Error: ${error}`)

