const express = require('express')
const config = require('config');
const app = express()
const mongoose = require('mongoose')
const { celebrate, Joi, errors, Segments } = require('celebrate');
require("dotenv").config();
const pizzaRoutes  = require('./src/routes/pizzaRoutes')
const userRoutes = require('./src/routes/userRoutes')
const orderRoutes = require('./src/routes/orderRoutes')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentation  = require('./swagger.json');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())


//mongoose connection 
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to the database");
})
.catch(err=>{
    console.log(`failed to connect`+err);
})


app.get('/',(req,res)=>{
    res.send("****************Welcome on Pizzy backend****************")
})

app.use(cors())
app.use(userRoutes)
app.use(pizzaRoutes)
app.use(orderRoutes)
app.use('/pizzy-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))

const port = 4000;
app.listen(port, ()=>{
   console.log(`Listening on port ${port}`)
} )