const express = require("express")
const adminRoute = express.Router()
const adminController = require("../contoller/adminController")
const trycatch = require("../middleware/tryCatchMiddleware")

adminRoute.post("/login",trycatch(adminController.login))
adminRoute.get("/users",trycatch(adminController.getAllUsres))
adminRoute.get("/users/:id",trycatch(adminController.getUsersbyId))

module.exports = adminRoute