const jwt = require('jsonwebtoken')
const { User } = require('../models/users/user')
const { formatResult } = require('../utils/formatResult')


// the authentication middleware


async function auth(req,res,next){
    const header = req.header('authorization')

    if(header){
        const token = header.split('')[1];

    try{
        const decoded = jwt.verify(token,process.env.KEY)
        req.user = decoded;
        next()
    }
catch(error){
   res.send(formatResult({
    status:401,
    message:"no token found"
   }))
}
    }
    else{
    res.send(formatResult({
    status:401,
    message:"no token found"
    })
    )
    }
}

exports.auth = auth
