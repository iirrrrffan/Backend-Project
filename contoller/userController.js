const Users=require("../models/userSchema")
const {joiUserSchema}=require("../models/validationSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports={
    createUser:async(req,res)=>{
        // const {value,error}=userValidationSchema.validate(req.body)
        const {name,username,email,password}=req.body;
        // if(error){
        //     res.json(error.message)
        // }
        await Users.create({
            name:name,
            username:username,
            email:email,
            password:password
        })
        res.status(201).json({
            status:"success",
            message:"user registration is success"
        })

    },
    
    // Login--
    userLogin:async (req,res)=>{
        const {value,error} = joiUserSchema.validate(req.body)
        if(error){
            res.status(400).json({
                status:error,
                message:"somthing wrong"
            })
        }
        const {username,password} = value;
        const user = await Users.findOne({username:username})
        if(!user){
            res.status(400).json({
                status:error,
                message:"not a user"
            })
        }
        if(!password || !user.password){
            res.status(400).json({
                status:error,
                messsage:"invalid input"
            })
        }
        const checkpass = await bcrypt.compare(password,user.password)
        if(!checkpass){
            res.status(400).json({
                status:error,
                message:"incorrect password"
            })
        }
        const token = jwt.sign(
            {usernam:user.username},
            process.env.USER_ACCESS_TOKEN_SECRET,
            {expiresIn: 86400}

        )
           res.status(200).json({
            status:"success",
            message:"login success",
            data:token
           })
     
    }   
}