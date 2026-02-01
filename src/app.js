const express = require('express');
const app = express();

const {adminAuth} = require("./middlewares/auth")

app.use("/admin",adminAuth)

app.get("/admin/getAllData",(req,res)=>{
    //check if the reques is authorized
    res.send("All data sent")
    
})

app.get("/admin/deleteData",(req,res)=>{
   res.send("delete")
})

app.listen(3000,()=>{
    console.log("server is running successfully")
})