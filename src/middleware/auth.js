const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

const AdminAuth  = (req, res, next)=>{
    console.log('Admin Auth is getting executed')
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request")
    }else{
    next()
    }
}

// const UserAuth  = (req, res, next)=>{
//     console.log('User Auth is getting executed')
//     const token = "xyz"
//     const isAdminAuthorized = token === "xyz"
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized Request")
//     }else{
//     next()
//     }
// }

const UserAuth = async(req,res,next)=>{
    try{
    // Read the token from req.cookies 
    const {token} = req.cookies 
    if(!token){
        // throw new Error("Invalid Token ")
        return res.status(401).send('Please login !')
    }
    const decodedObj = await jwt.verify(token,"DevTinder@2026")
    // const decodedObj = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    const {_id} = decodedObj
    // Validate the token and find the user 
    const user = await userModel.findById(_id)
    if(!user){
        throw new Error("User not found")
    }
    req.user = user
    next()
    
    }catch(err){
        res.status(400).send('Authentication Failed : ' + err.message)
    }
}


// module.exports = AdminAuth
module.exports = { 
    UserAuth
}
