const Users=require("../models/userSchema")
const {joiUserSchema}=require("../models/validationSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Product = require("../models/productSchema")

module.exports={
    createUser:async(req,res)=>{
        const {name,username,email,password}=req.body;
 
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
     
    },
   
  //product list-------
    
    productList : async (req,res)=>{
        const product = await Product.find();
        if(product.length === 0){
           return res.status(400).json({message:"no product"})
        }
        res.status(201).json({
            status:"success",
            message:"successfully listed",
            product
        })
        
    },
    // product by id ---------

    productGetById :  async (req,res)=>{
        const Id = req.params.id
        const productId = await Product.findById(Id)
        if(!productId){
          res.status(404).json({error : "error in fetching"})
        }
        res.status(201).json({
          status : "success",
          message : "product succesfully fetched",
          data : productId
        })
        
      },

      ProductByCategory: async (req, res) => {
        const Category = req.params.categoryname;
        console.log(Category)
        const products = await Product.find({ category: Category });
        if (!products) {
          return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({
          status: "success",
          message: "Successfully fetched category details.",
          data: products,
        });
      },
      
      addToCart: async (req,res)=>{
        const userId = req.params.id;
        const productId = req.body.productId;
        await Users.updateOne({_id:userId},{$push:{cart:productId}});
        console.log(productId);
        res.status(200).json({
          status:'success',
          message : "product succesfully added to cart"
        })
      },

      
    deleteFromCart : async (req,res)=>{
      const userId = req.params.id;
      const productId = req.body.productId;
      await Users.updateOne({_id : userId},{$pull:{cart : productId}})
      res.status(201).json({
        status : "success",
        message :"product removed from the cart",
        
      })
    },
    showCart: async (req, res) => {
      const userId = req.params.id;
      const cart = await Users.findOne({ _id: userId }).populate("cart");
      console.log(cart)
      if (!cart) {
        return res.status(404).json({ error: "Nothing to show on Cart" });
      }
      res.status(200).json({
        status: "success",
        message: "Successfully fetched cart details.",
        data:cart,
      });
    }
}