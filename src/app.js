const express = require('express');
const connectDB =  require("./config/database")
const User = require("./models/user")

const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    // console.log(req.body)

    // const userObj = {
    //     firstName: "Kajal",
    //     lastName: "Tomar",
    //     emailId: "kajaltomar2005@gmail.com",
    //     password: "kajal123",
    
    // }
    const user = new User(req.body)
    try {
        await user.save();
    res.send("user added successfully")
    } catch(err){
        res.status(400).send("something went wrong")
    }
    
});

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


