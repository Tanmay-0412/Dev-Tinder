// creating a server to listen the incoming requests from outside world, 
// With the help of Express Js  
const express = require('express')
const app = express()  // instance of express server

// app.use("/ab?c"  ---> /abc , /ac

// /.*fly$/ --> butterfly, fly , dragonfly , 
app.use(/a/,(req,res)=>{
    res.send({firstname:'Tanmay',lastname:'Sawant'})
})

//? Access to /users , /users/xyz, ---> users?userid=101&password='testing'
// app.use('/users',(req,res)=>{
//     console.log(req.query)
//     res.send(' App use is executed')
// })


app.use('/users/:userId/:name/:password  ',(req,res)=>{
    console.log(req.params)
    res.send(' App use is executed')
})
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})



