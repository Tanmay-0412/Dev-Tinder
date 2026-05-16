const express = require('express')
const { UserAuth } = require('../middleware/auth')
const userRouter = express.Router()
const ConnectionRequestModel = require('../models/connectionRequest')
const userModel = require('../models/user')

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

// Get all the pending connection request for the loggedInUser 
userRouter.get('/user/requests/recieved', UserAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user 
        const connectionRequest = await ConnectionRequestModel.find({toUserId : loggedInUser._id,status : 'interested' })
        // .populate("fromUserId", ["firstName", "lastName"])
        .populate("fromUserId", "firstName lastName photoUrl age about skills")

        if(connectionRequest.length === 0){
            return res.status(400).json({message:'No pending requests'})
        }
        // refercing , making a relation between two tables
        const fromUser = await userModel.find(connectionRequest.fromUserId)
        // console.log(fromUser)

        res.json({message:'Data fetched sucessfully !', data : connectionRequest})
    }catch(err){
        res.status(400).json({Error: err.message})
    }
})

// Get all connected peoples
userRouter.get('/user/connection', UserAuth, async(req,res)=>{  
    try{
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequestModel.find({status:"accepted", 
            $or: [
                {fromUserId : loggedInUser._id}, 
                {toUserId: loggedInUser._id}]}
            ).populate("toUserId", USER_SAFE_DATA).populate("fromUserId", USER_SAFE_DATA)

        // status should be accepted and userId must be in fromUserid or toUserId ( sender and reciever )
        if(connectionRequest === 0){
            res.status(400).json({message:"No connection found"})
        }
        const data = connectionRequest.map((row) => { 
            // console.log(row.fromUserId._id)
            // console.log(loggedInUser._id)
            if((row.fromUserId._id).equals(loggedInUser._id)){
                return  row.toUserId
            } 
            return row.fromUserId
        })

        res.json({message:"Connection fetched successfully", data: data })
    }catch(err){
        res.status(400).json({error :err.message})
    }
})

  
module.exports = userRouter