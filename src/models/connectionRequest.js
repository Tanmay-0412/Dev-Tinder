const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.ObjectId,
        ref:"User", // reference to the   collection
        required : true,
    },
    toUserId:{
        type: mongoose.Schema.ObjectId, 
        ref:"User",
        required : true,
    },
    status:{
        type:String,
        enum: {
            values :["interested","ignored","accepted","rejected"],
            message : `{VALUE} is incorrect status type`
        },
        required:true
    } 
}, {timestamps : true})

connectionRequestSchema.index({fromUserId: 1, toUserId : 1})

connectionRequestSchema.pre("save", function(){
    const connectionRequest = this
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('You cannot send connection to yourself !')
    }
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel