const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require('../utils/validation');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

authRouter.post("/signup",async (req,res)=>{ 
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
authRouter.post("/login", async (req,res)=>{
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

authRouter.post("/logout", async(req,res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("logout successful");
});

module.exports = authRouter