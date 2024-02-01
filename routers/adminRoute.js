const express = require("express")
const adminRoute = express.Router()
const adminController = require("../contoller/adminController")
const trycatch = require("../middleware/tryCatchMiddleware")
const varifyTocken = require("../middleware/adminAuthMiddleware")
const upload = require("../middleware/imageupload")

adminRoute.post("/login",trycatch(adminController.login))
adminRoute.get("/users",trycatch(adminController.getAllUsres))
adminRoute.get("/users/:id",trycatch(adminController.getUsersbyId))
adminRoute.post("/products",upload,trycatch(adminController.createProduct))
adminRoute.get("/products",trycatch(adminController.getAllProduct))
adminRoute.get("/products/category",trycatch(adminController.getProductById))
adminRoute.get("/products/:id",trycatch(adminController.getProductById))



module.exports = adminRoute