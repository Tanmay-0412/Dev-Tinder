const validator = require('validator')

const validateSignUpData = (req) =>{
    //destructuring the object
    const {firstName,lastName,emailId,password} = req.body
    if(!firstName || !lastName){
        throw new Error("Name is not valid !")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!")
    }
}

const validateLoginData = (req) =>{
    const{emailId, password} = req.body
    if(!emailId || !password){
        throw new Error("Please enter the correct crendentials")
    }else if( !validator.isEmail(emailId)){
        throw new Error("Email is invalid")
    }
} 

const validateEditProfileData = (req)=>{
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "age","gender","about", "skills", "mobileNo"]
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))
    return isEditAllowed
}
module.exports = {
    validateSignUpData, 
    validateLoginData, 
    validateEditProfileData
}