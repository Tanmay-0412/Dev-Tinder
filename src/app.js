// creating a server to listen the incoming requests from outside world, 
// With the help of Express Js  
const express = require('express')
const app = express()  // instance of express server




app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})



