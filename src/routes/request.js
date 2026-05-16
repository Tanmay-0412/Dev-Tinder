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

// Review Request Api
requestRouter.post('/request/review/:status/:requestId', UserAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user
        const {status ,requestId} = req.params
        const allowedStatus = ['accepted','rejected']
        const isAllowedStatus = allowedStatus.includes(status)

        if(!isAllowedStatus){
            res.status(400).json({message:'Status is not allowed '})
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id:requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        // console.log(connectionRequest)

        if(!connectionRequest){
            res.status(400).json({message :'Connection request not found'})
        }

        const fromUser = await userModel.findById(connectionRequest.fromUserId)
        // console.log(fromUser.firstName)

        connectionRequest.status = status
        const data = await connectionRequest.save()
        res.json({message:`Connection request is ${status}`, data, displayMessage :`${loggedInUser.firstName} has ${status} request from ${fromUser.firstName}`})

        // Is Akshay logged In  , allowed status, valid requestId - present in db
        // Check if userId === toUserId in connectionrequest
        // Depends on status - if status is interested then only user can accept or reject 
        // Once Ignored you cant convert it to Interested 
        // if yes fromUserId name of the User

    }catch(err){
        res.status(400).send("Error :" + err.message)
    }
})


module.exports = requestRouter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  