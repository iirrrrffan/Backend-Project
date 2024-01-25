const user = require("../models/userSchema")
const jwt = require("jsonwebtoken")


module.exports = {
    login:async (req,res)=>{
        const {username,password} = req.body;
        if(
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD

            ){
                const token = jwt.sign(
                    {username:user.username},
                    process.env.ADMIN_ACCESS_TOKEN_SECRET,
                    
                )
                res.status(200).json({
                    status:"success",
                    message:"token provided",
                    data: {jwt_token:token}
                })
            }else{
                return res.status(400).json({
                    status:"error",
                    message:"not an admin"
                })
            }
        },
        // get users--

        getAllUsres: async (req,res)=>{
            const allUsers = await user.find();
            res.status(200).json({
                status:"success",
                message:"successfully fetched users",
                data: allUsers
            })
           
        },

        getUsersbyId: async(req,res)=>{
            const userId = req.params.id
           const  usersbyId = await user.findById(userId)
           if(!usersbyId){
            res.status(400).json({
                status:"error",
                message:"not an user"
            })
           }
           res.status(200).json({
            status:"success",
            message:"successfully fetched user By ID",
            data:usersbyId
           })
        },

        // create product----
}