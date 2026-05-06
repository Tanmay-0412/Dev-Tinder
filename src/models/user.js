const mongoose = require('mongoose')

// defining a Schema  
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required:true,
        minLength:3,
        maxLength:20, 
    },
    lastName : {
        type: String,
        minLength:3,
        maxLength:20,
    },
    emailId : {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    }, 
     password : {
        type: String,
        required:true,
        minLength:8,
    },
    age : {
        type : Number,
        min:18, 
        max:100
    },
    gender : {
        type: String,
        validate(value) {
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid ")
            }
        }
    },
    photoUrl : {
        type : String,
        default: "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type: [String]
    },
    mobileNo:{
        type:String,
        match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
},{
    timestamps:true
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel