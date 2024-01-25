const express=require("express")
const userRouter=express.Router()
const userController=require("../contoller/userController")
 const trycatch=require("../middleware/tryCatchMiddleware")


 userRouter.post("/register",trycatch(userController.createUser))
 userRouter.post("/login",trycatch(userController.userLogin))


 module.exports=userRouter;