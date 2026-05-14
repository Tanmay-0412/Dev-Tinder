const express = require('express')
const { UserAuth } = require('../middleware/auth')
const ConnectionRequestModel = require('../models/connectionRequest')
const userModel = require('../models/user')
const requestRouter = express.Router()

//Send connection request
requestRouter.post('/request/send/:status/:toUserId', UserAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user
        const fromUserId = loggedInUser._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        // Validate user existence
        const toUser = await userModel.findById(toUserId)
        if(!toUser){
            throw new Error("User does not exists !")
        }

        // if(fromUserId.toString() === toUserId){
        //     throw new Error("You cannot send request to yourself")
        // }

        // Validate status
        const allowedStatus = ['interested','ignored']
        if(!allowedStatus.includes(status)) {
            throw new Error('Invalid status type :' + status)
        }  

        // Check existing request in BOTH directions
        const exisitingConnectionRequest = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId:fromUserId}
            ]
        })
        if(exisitingConnectionRequest){
            throw new Error("Connection request already exists !")
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save()  
        let message = ""

        if(status === "interested"){
            message = `${req.user.firstName} is interested in ${toUser.firstName}`
        }
        else if(status === "ignored"){
            message = `${req.user.firstName} ignored ${toUser.firstName}`
        }
        res.json({message,data})
    }catch(err){
        res.status(400).send("Error :" + err.message)
    }
})


module.exports = requestRouter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  