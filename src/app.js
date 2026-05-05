// creating a server to listen the incoming requests from outside world, 
// With the help of Express Js  
const express = require('express')
const app = express()  // instance of express server
const {connectDb} = require("./config/database")
require("./config/database") 
const userModel = require("./models/user")

app.use(express.json())

// Post Api -- Signup 
app.post("/signup", async (req,res)=>{
    // const userObj = {
    //     firstName: "Sachin",  
    //     lastName: "Tendulkar",
    //     email:"sachin@gmail.com",
    //     password:'sachin321',
    //     // _id: "507f1f77bcf86cd799439011" -- unique id with 24 hex character string
    // }
    // Creating a new instance of the User model 
    const userObj = req.body
    const user = new userModel(userObj)
    try {
        await user.save()
        res.send("Data saved successfully !")
    }
    catch(err){
        // res.status(400).send("Error saving the user", err.message)
        res.status(400).json({ error: err.message });
    }
     
})

// Get user by email
    app.get("/users", async (req,res)=>{
           
        const userEmail = req.body.emailId
        const users = await userModel.findOne({emailId:userEmail})
        if(!users){
            res.status(400).send("User not Found")
        }
        else{
        res.send(users)
        }
        // const userEmail = req.query.emailId  -- get All
        // const userEmail = req.body.emailId
        // try{ 
        //     const users = await userModel.find({emailId: userEmail})
        //     if(users.length === 0){
        //         res.status(400).send("User Not Found !")
        //     }else{
        //     res.send(users)
        //     }
        // }
        // catch(err){
        //     res.status(400).send("Something went wrong !")
        // }
    })

    // Feed API - GET method - get all the users from the database
    app.get("/feed", async (req,res)=>{
        try{
            const users = await userModel.find({})
            res.send(users)
        }
        catch(err){
             res.status(400).send("Something went wrong !")
        }
    })

app.get("/getuserbyid", async(req,res)=>{
    const userid = req.body._id
    console.log(userid)
    const users = await userModel.findById(userid)
    res.send(users)
})

// Delete APi -- delete an user by id
app.delete("/deleteuser", async(req,res)=>{
    const userid = req.body.userId
    console.log(userid)
    try{
        // const user = await userModel.findByIdAndDelete({_id: userid})
        const user = await userModel.findByIdAndDelete(userid)
        res.send("User Delete successfully")
    }catch(err){
        res.status(400).send("Something went wrong !")
    }
})

// Update API - update an user in database - findByIdAndUpdate & findOneAndUpdate
app.patch("/users", async(req,res )=>{
     const userid = req.body._id
     const data = req.body 
     try {
        // const users = await userModel.findOneAndUpdate({_id:userid}, data, {returnDocument:"after"})
        const users = await userModel.findByIdAndUpdate(userid, data)
        console.log(users)
        res.send("User updated successfully !") 
     }catch(err){
        res.status(400).send("Something went wrong !")
     }
})

// API -- Update the user with the emailId
app.patch("/usersEmail", async (req,res)=>{
    const userEmail = req.body.emailId
    const query = req.body
    console.log(query)
    try{
        const users = await userModel.findOneAndUpdate({emailId: userEmail}, query)
        console.log(users) 
        res.send("User updation completed with email")
    }catch(err){
        res.status(400).send("Something went wrong !")
    } 
})

connectDb().then(()=>{   
    console.log("Database connection established...")
    app.listen(3000, ()=>{
        console.log("Server is listening on port 3000")
    })
}).catch(err =>{
    console.error("Database connection failed")
})

// mongodb+srv://tanmaysawant01_db_user:root%402001@notesapp.gwiaszp.mongodb.net/