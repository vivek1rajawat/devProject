const express = require('express');
const connectDB =  require("./config/database")
const User = require("./models/user")
const {validateSignUpData} = require('./utils/validation')
const bcrypt = require('bcrypt');



const app = express();

app.use(express.json());
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
    const user  = await findOne({emailId: emailId});
    if(!user){
        throw new  Error("Invalid credential");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
        res.send("Login successfully");

    }
    else{
        throw new Error("Password is not correct")
    }
    } catch (err){
        res.status(404).send("something went wrong " + err.message)
    }
})

//delete a user from the database
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
    } catch (err){
        res.status(401).send("somethng went wrong")
    }
})

//update data of the user
app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body

    
    try{
        const ALLOWED_UPDATES = [ "photoUrl", "about", "gender", "age", "skills"]

        const isUpdateAllowed = Object.keys(data).every((k)=> 
        ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("Update not allowed")
    }
    if(data?.skills.length > 10){
        throw new Error ("skills cannot be more than 10");
    }
        const user = await User.findByIdAndUpdate({_id: userId},data, {runValidators:true})
        res.send("user updated successfully")

    } catch (err) {
        res.status(404).send("something went wrong" + err.message)
    }
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


