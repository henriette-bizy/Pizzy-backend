const express = require('express')
const config = require('config');
const app = express()
const mongoose = require('mongoose')
require("dotenv").config();
const {auth} = require('./middlewares/authentication')
const {pizzaRoutes}  = require('./routes/pizzaRoutes')
const {userRoutes} = require('./routes/userRoutes')


const bodyParser = require('body-parser')




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

// app.use('/users/',userRoutes)
app.use(pizzaRoutes)


const port = 4000;
app.listen(port, ()=>{
   console.log(`Listening on port ${port}`)
} )