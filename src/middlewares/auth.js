const adminAuth = (req,res,next)=>{
    //admin auth is getting checked
    const token = "xyz";
    const isAuthorised = token === "xyz"
    if(!isAuthorised){
        res.status(401).send("unauthorized")
    }
    else{
        next();
    }
};
module.exports={
    adminAuth,
}