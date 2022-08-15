const {User,UserValidation} = require ("../../models/users/user")

exports.createUser = async (req,res)=>{
try{

 const{error} = UserValidatio(req.body)
 if(error) 
 return res.status(400).send(error.details)

const newUser = new User({
    userNames:req.body.userNames,
    userEmail:req.body.userEmail,
    userPassword:req.body.userPassword
})

console.log(newUser)
try{
    await newUser.save()
    res.status(201).send("use created succesffuly")
}catch(err){
    return res.send(err.details).status(400)
}
}catch(err){
    res.send(err.details).status(400)
}
}


exports.getAllUsers = async(req,res)=>{


    try{
    const Users = await User.find()

    return res.send(Uses).status(200)
}catch(err){
    res.send(err.details).status(400);
}
}

exports.getUser = async(req,res)=>{
    try{
     const user = User.findById(req.params.id)   
     if(!user){
        return res.send("User not found").status(404);
     }

     return res.send(user).status(200)
    }
    catch(err){
        res.send(err.details)
    }
}