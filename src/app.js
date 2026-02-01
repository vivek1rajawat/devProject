const express = require('express');
const app = express();

app.use("/user",(req,res,next)=>{
    console.log("handling the route  user1")
   
    next();
     res.send("Response 1")
},
(req,res)=>{
    console.log("handling the route user2")
    res.send("Response 2")
})

app.listen(3000,()=>{
    console.log("server is running successfully")
})