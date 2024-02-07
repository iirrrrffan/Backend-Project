const express=require("express")
const userRouter=express.Router()
const userController=require("../contoller/userController")
 const trycatch=require("../middleware/tryCatchMiddleware")
 const varifyTocken = require("../middleware/userAuthMiddleware")


 userRouter.post("/register",trycatch(userController.createUser))
 userRouter.post("/login",trycatch(userController.userLogin))
 userRouter.get("/products",varifyTocken,trycatch(userController.productList))
 userRouter.get("/products/:id",varifyTocken,trycatch(userController.productGetById))
 userRouter.get("/products/category/:categoryname",varifyTocken,trycatch(userController.ProductByCategory))
 userRouter.post("/:id/cart",varifyTocken,trycatch(userController.addToCart)) 
userRouter.delete("/:id/cart",varifyTocken,trycatch(userController.deleteFromCart))
userRouter.get("/:id/cart",varifyTocken,trycatch(userController.showCart))
// -----------------------------------------
userRouter.post("/:id/wishList",varifyTocken,trycatch(userController.wishList))
userRouter.get("/:id/wishList",varifyTocken,trycatch(userController.showWishList))
userRouter.delete("/:id/wishList",varifyTocken,trycatch(userController.deleteWishList))
 


 module.exports=userRouter; 