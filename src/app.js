// creating a server to listen the incoming requests from outside world, 
// With the help of Express Js  
const express = require('express')
const app = express()  // instance of express server
const {connectDb} = require("./config/database")
require("./config/database")
const userModel = require("./models/user")


// Post Api -- Signup 
app.post("/signup", async (req,res)=>{
    const userObj = {
        firstName: "Akshay",
        lastName: "Saini",
        email:"try@gmail.com",
        password:'user1234'
    }
    // Creating a new instance of the User model 
    const user = new userModel(userObj)
    await user.save()

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