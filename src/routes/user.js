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
        .populate("fromUserId", "firstName lastName photoUrl age about skills gender")

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
// Pagination - Feature
userRouter.get('/user/feed', UserAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user

        const page = parseInt(req.query.pageNo) || 1
        let limit = parseInt(req.query.limit) || 10
        limit = limit > 11 ? 10 : limit
        const skip =  (page-1)*limit 


        // Find all the connections that have sent and recieved
        const connectionRequests = await ConnectionRequestModel.find({
            $or : [
            {toUserId : loggedInUser._id },
            {fromUserId : loggedInUser._id}
            ]}).select('fromUserId toUserId')
            // .populate("fromUserId", "firstName").populate("toUserId", "firstName").sort({createdAt :-1})
        
        const hideUsersFromFeed = new Set() // set data structes does not accept duplicate elements
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        
        const users = await userModel.find({
            // both the conditions are true , nin - not in the array, ne : not equal to
            $and : [
            {_id : {$nin : Array.from(hideUsersFromFeed)}},
            {_id : {$ne : loggedInUser._id}}
        ]}).select(USER_SAFE_DATA).skip(skip).limit(limit)
        
        res.json({message:'Users data loaded', data: users})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
})
  
module.exports = userRouter