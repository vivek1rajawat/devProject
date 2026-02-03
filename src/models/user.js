const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn.vectorstock.com/i/500p/96/77/blank-grey-scale-profile-picture-placeholder-vector-51589677.jpg"
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps:true
})

const User = mongoose.model('User',userSchema);
module.exports = User;