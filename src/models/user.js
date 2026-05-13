const mongoose = require('mongoose')
var validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// defining a Schema  
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required:true,
        minLength:3,
        maxLength:20, 
        index:true,
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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address :" + value)
            }
        }
        // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    }, 
     password : {
        type: String,
        required:true,
        minLength:8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password !")
            }
        }
    },
    age : {
        type : Number,
        min:18, 
        max:100
    },
    
    gender : {
        type: String,
        // enum: ["male","female","other"]
        enum : {
            values : ["male","female","other"],
            message : `{VALUE} is not a valid gender type`
        }
        // Custom validator
        // validate(value) {
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid ")
        //     }
        // }
    },
    photoUrl : {
        type : String,
        default: "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL:" + value)
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type: [String],
        validate(value){
            if(value.length >4){
                throw new Error('Only 4 skills can be entered !')
            }
        }
    },
    mobileNo:{
        type:String,
        match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
},{
    timestamps:true
})
// schema validation helper methods 
userSchema.methods.getJWT = async function (){
    const user = this  // referencing to the instance of the user
    const token = await jwt.sign({_id:user._id}, "DevTinder@2026", {expiresIn :"1d"})
    return token;
}

userSchema.methods.validatePassword = async function(passwordInput){
    const user = this
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInput, passwordHash)
    return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel