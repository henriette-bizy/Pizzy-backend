const jwt = require("jsonwebtoken");
const { User } = require("../models/users/user");
const { formatResult } = require("../utils/formatResult");
const jwtdecode = require('jwt-decode')
function auth(req, res, next) {
  try {
    const header = req.header("authorization");
    if (header == undefined) {
      res.send(
        formatResult({ status: 403, message: "Forbiden due to missing token" })
      );
    }
    
    const bearerToken = header.split(" ")[1];
    console.log(bearerToken);

    jwt.verify(bearerToken, process.env.KEY, (error, decoded) => {
      if (error) {
        res.send(formatResult({ status: 403, message: error }));
      }
      
      res.user = decoded;
      next();
      
    });
  } catch (error) {
    res.send(formatResult({ status: 403, message: error, data:error }));
    console.log(error, 'errrrorr')
  }
}

/**
  
Firstly authenticating      
    */
exports.auth = auth;
