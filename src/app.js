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
    console.log(req.body)
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



connectDb().then(()=>{   
    console.log("Database connection established...")
    app.listen(3000, ()=>{
        console.log("Server is listening on port 3000")
    })
}).catch(err =>{
    console.error("Database connection failed")
})

// mongodb+srv://tanmaysawant01_db_user:root%402001@notesapp.gwiaszp.mongodb.net/