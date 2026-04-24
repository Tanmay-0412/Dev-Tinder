// creating a server to listen the incoming requests from outside world, 
// With the help of Express Js  
const express = require('express')
const app = express()  // instance of express server

app.use("/home",(req,res)=>{
    if(req.url === "/test"){
        res.send("Hello World by Testing !!")
    }
    res.send("Hello from the server 123")
})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})



