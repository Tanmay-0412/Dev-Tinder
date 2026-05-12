const express = require('express')
const { UserAuth } = require('../middleware/auth')
const requestRouter = express.Router()

//Send connection request
requestRouter.post('/sendConnectionRequest', UserAuth, async (req,res)=>{
    const user = req.user
    // Sending a connection request  
    res.send(user.firstName + " has sent you a connection request")

})

module.exports = requestRouter