require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const PORT = 3000;
const userRoute=require("./routers/userRoute")
const adminRoute = require("./routers/adminRoute")

mongoose.connect("mongodb://0.0.0.0:27017/Database-new", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json())
app.use("/api/users/",userRoute)
app.use("/api/admin/",adminRoute)




app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})