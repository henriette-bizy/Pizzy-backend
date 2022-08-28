const Joi = require('joi')

const validateParams = (requestParams) =>{
    const validateParams = Joi.object({
        requestParams:Joi.string().max(80).min(1)
    })

    return validateParams.validate(requestParams)
}

module.export = validateParams;
