const express=require("express")
const userRouter=express.Router()
const userController=require("../contoller/userController")
 const trycatch=require("../middleware/tryCatchMiddleware")
 const varifyTocken = require("../middleware/userAuthMiddleware")


 userRouter.post("/register",trycatch(userController.createUser))
 userRouter.post("/login",trycatch(userController.userLogin))
 userRouter.get("/products",varifyTocken,trycatch(userController.productList))

 module.exports=userRouter;