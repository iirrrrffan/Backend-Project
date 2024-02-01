const user = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const Product = require("../models/productSchema")


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
        createProduct : async (req,res)=>{
            // const {value,error} = joiProductSchema.validate(req.body);
            const {title,description,price,image,category} = req.body ;
            // if(error){
            //     res.json(error.message)
            // }
            const data = await Product.create ({
                title ,
                description,
                price,
                image,
                category,
             });
   
             res.status(201).json({
                status : "success",
                message : "product successfully created",
                data:data
             })
    
          },
          //take product----
          getAllProduct : async(req, res)=>{
            const getAllProduct = await  Product.find();
            res.status(201).json({
              status : "success",
              message: "succesfully fetch product",
              data : getAllProduct
            })
          },
          getProductsByCatogory: async (req, res) => {
            const categ = req.query.name;
          
            const products = await Product.find({ category: categ });
            if (!products) {
              return res.status(404).json({ error: "Category not found" });
            }
            res.status(200).json({
              status: "success",
              message: "Successfully fetched product details.",
              data: products,
            });
          },
          

      getProductById: async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
          status: "success",
          message: "Successfully fetched product details.",
          data: product,
        });
      }
}