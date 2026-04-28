//! Understanding the routing 
// app.use("/home",(req,res)=>{
//     if(req.url === "/test"){
//         res.send("Hello World by Testing !!")
//     }
//     res.send("Hello from the server 123")
// })


//! Order/Sequence of Routing is important/ It matters 
// app.use("/hello",(req,res)=>{
//     res.send("Hello Hello....... !!")
// })

// app.use("/test",(req,res)=>{
//     res.send("Testing the server ")
// })
// app.use("/",(req,res)=>{ 
//     res.send("Namaste Node JS ")
// }) 


//? Testing all the Http Methods
app.use('/users',(req,res)=>{
    res.send('App.use is executed')
})
app.get('/users',(req,res)=>{
    res.send({firstName:'Tanmay', lastName:"Sawant"})
})

app.post('/users',(req,res)=>{
    res.send("Data successfully saved to the database !")
})

app.delete('/users',(req,res)=>{
    res.send('User deleted successfully ')
})
app.use("/test",(req,res)=>{
    res.send("Testing the server ")
})
