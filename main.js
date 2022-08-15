const express = require('express')
const app = express()

const bodyParser = require('body-parser')




app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())



app.use(require('./routes/userRoutes'))

const port = 4000;
app.listen(port, ()=>{
   console.log(`Listening on port ${port}`)
} )