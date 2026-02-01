const express = require('express');
const app = express();
//use will match hall the http method api calls
// app.use("/",(req,res)=>{
//     res.send("hello from the serverrr");
// })

app.get("/user",(req,res)=>{
    res.send({firstName:"Vivek",lastName:"Rajawat"});
})
app.get("/user/:userID",(req,res)=>{
    res.send({firstName:"Vivek",lastName:"Rajawat"});
})
app.post("/user",(req,res)=>{
    console.log("save the data to the database");
    res.send("data successfully saved to the database");
})
app.use("/hello",(req,res)=>{
    res.send("hello helloo helloo");
})


app.use("/test",(req,res)=>{
    res.send("hello tesst");
})
app.listen(3000,()=>{
    console.log("server is running successfully")
})