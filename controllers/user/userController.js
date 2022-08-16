const { valid } = require("joi");
const {User,UserValidation} = require ("../../models/users/user")
const hashPassword  = require('../../utils/hashPassword')
const isValidObjectId = require('../../utils/formatResult')


exports.getContent =  async (req,res)=>{
    try{
    const bodyy = await req.body;
    res.send(bodyy);
    console.log("it's us babby")
}
catch(err){
    res.send(err.details);
}

}



//for creating the new user
exports.createUser = async (req,res)=>{
   
try{

 const{error} = UserValidation(req.body)
 if(error) 
 return res.status(400).send(error.details)

 

const user = req.body;

//checking the duplicate email
const duplicateEmail = await User.findOne({userEmail:"hopebiziyaremye@gmail.com"})
console.log(duplicateEmail);

if(duplicateEmail){
    res.send({
        status:403,
        message:"user already exist"
    }).status(403)

    console.log("we already in this block beyibi");
    console.log(user);
}
else{
try{
    let newUser = new User(user)
    console.log(newUser);

    //question codes slash bugs
    const hashedPasswsord = await hashPassword(newUser.userPassword)
    newUser.userPassword = hashedPasswsord;
    console.log(newUser)
    await newUser.save()
    res.send(newUser);
    res.status(201).send("use created succesffuly")
}catch(err){
    return res.send(err.details).status(400)
}
}
}catch(err){
    res.send(err.details).status(400)
}
}



//getting all the users
exports.getAllUsers = async(req,res)=>{
    try{
    const users = await User.find()
     console.log(users)
    return res.send(users).status(200)
}catch(err){
    res.send(err.details).status(400);
}
}

exports.getUser = async(req,res)=>{
    try{
     const user = User.findByOne({_id:req.params.id})
 
     if(!user){
        return res.send("User not found").status(404);
     }

     return res.send(user).status(200)
    }
    catch(err){
        res.send(err.details)
    }
}

exports.updateUser = async(req,res)=>{

    try{
        const{error} = UserValidation(req.body)
        if(error) 
        return res.status(400).send(error.details)
       

        //finding the user
        const user = await User.findOne({
            _id: req.params.id
        }) 
        if(!user){
            return res.send("User not found").status(404);
        }

        const duplicateEmail = await User.findOne({
            _id: {
                $ne: req.params.id
            },
            userEmail: req.body.email
        })
        if(duplicateEmail)
           return res.status(403).send("user with this email already exists");

    
        const updatedUser = await User.findOneAndUpdate({_id:req.params.id},req.body)
        

        return res.send(updatedUser).status(200)


    }

catch(err){
res.send(err.details).status(400)
}
}

exports.deleteUser = async (req,res) =>{
    try{

        if (!isValidObjectId(req.params.id))
        return res.send("invalid email");


        const user = await User.findOneAndDelete({_id:req.params.id})

        if(!user)
          return res.send("user not found").status(404)

       return res.send(updatedUser).status(200)
    }catch(err){
        res.send(err.details)
    }
}
