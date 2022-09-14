const {logInValidating, User} = require('../../models/users/user')
const bcrypt = require('bcrypt');
const { formatResult } = require('../../utils/formatResult');

const login  = async (req,res) =>{

    try{
        
        const body =req.body;
        const {error} = logInValidating(body);

        if(error){
          return res.send(formatResult(
                {
                    status:400,
                    message:error.message 

                }
            ))
        }

        let user = await User.findOne({userEmail:req.body.userEmail})
        
        if(!user)
          res.send(formatResult({
             status:401,
             message:"Invalid email or password"
          }))

        const validPassword = await bcrypt.compare(req.body.userPassword, user.userPassword)
        
          
          if(!validPassword){
            return res.send(formatResult({
                status:401,
                message:"Invalid email or password"
            })).status(401)
          }

          return res.send(
            formatResult({
            status:200,
            message:"successfully logged in",
            data:{token:await user.generateAuthToken()}

          }))

    }catch(error){
        res.send(formatResult({
             status:700,
             message:error.details
        }))
    }
}

module.exports = login