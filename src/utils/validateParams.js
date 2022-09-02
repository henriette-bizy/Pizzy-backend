const Joi = require('joi')

const validateParams = (requestParams) =>{
    let isValid = true;
    
    const {error} =  Joi.string().length(25).min(3).validate(requestParams);
    if(error)
      isValid= false;


    return isValid,error.message;
}

module.export = validateParams;
