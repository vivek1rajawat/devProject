const express = require('express');
const connectDB =  require("./config/database")
const User = require("./models/user")
const {validateSignUpData} = require('./utils/validation')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const {userAuth} = require("./middlewares/auth")



const app = express();

app.use(express.json());
app.use(cookieParser());
//Get user by email  
app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail})
        if(user.length===0){
            res.status(404).send("user not found")
        }
        res.send(user)
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})
 

//Get all the user from the feed

app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users);
    } catch (err){
        res.status(400).send("something went wrong")
    }
})
app.post("/signup",async (req,res)=>{ 
    //validation of data
    try {
    validateSignUpData(req);
    //encrypt the password
    const {firstName, lastName, emailId, password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
    
        await user.save();
    res.send("user added successfully")
    } catch(err){
        res.status(400).send("something went wrong " + err.message)
    }
    
});

//login api
app.post("/login", async (req,res)=>{
    try{
    const {emailId, password} = req.body;
    const user  = await User.findOne({emailId: emailId});
    if(!user){
        throw new  Error("Invalid credential");
    }
    const isPasswordValid = await user.validatePassword(password)
    if(isPasswordValid){
        //create a jwt token
        const token = await user.getJWT();
        




        res.cookie("token", token)
        res.send("Login successfully");
    }
    else{
        throw new Error("Password is not correct")  
    }
    } catch (err){
        res.status(404).send("something went wrong " + err.message)
    }
})

app.get("/profile", userAuth, async(req,res)=>{
    try {
   

    //validate my token
    
     const user = req.user;
     
     res.send(user)
    } catch (err){
        res.status(404).send("something went wrong " + err.message)
    }

})
app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + " sent the connection request")
})


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000,()=>{
    console.log("server is running successfully")
})
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
    console.error(err.message);
  });


