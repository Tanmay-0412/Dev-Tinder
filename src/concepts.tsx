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
// app.use('/users',(req,res)=>{
//     res.send('App.use is executed')
// })
// app.get('/users',(req,res)=>{
//     res.send({firstName:'Tanmay', lastName:"Sawant"})
// })

// app.post('/users',(req,res)=>{
//     res.send("Data successfully saved to the database !")
// })

// app.delete('/users',(req,res)=>{
//     res.send('User deleted successfully ')
// })
// app.use("/test",(req,res)=>{
//     res.send("Testing the server ")
// })

// app.use("/ab?c")  ---> /abc , /ac

// /.*fly$/ --> butterfly, fly , dragonfly , 
// app.use(/a/,(req,res)=>{
//     res.send({firstname:'Tanmay',lastname:'Sawant'})
// })

//? Access to /users , /users/xyz, ---> users?userid=101&password='testing'
//! Query paramas
// app.use('/users',(req,res)=>{
//     console.log(req.query)
//     res.send(' App use is executed')
// })



//? Dynamic routes
// app.use('/users/:userId/:name/:password  ',(req,res)=>{
//     console.log(req.params)
//     res.send(' App use is executed')
// })

//! Multiple Route Handlers
// app.use("/route", rH, rH1, rH2, rH3, rH4)
// app.use("/route", [rH, rH1, rH2, rH3, rH4] )
// app.use("/route", [rH, rH1], rH2, rH3, rH4 )

// app.use('/users',
// (req,res,next)=>{
//     // route handler
//     console.log("Handling the route server 1") 
//     next() 
//     // res.send('Response 1')      
// },
// (req,res,next) =>{
//     console.log('Handling   the route server 2')
//     // res.send("2nd Response")
//     next()
// },
// (req,res,next) =>{ 
//     console.log('Handling  the route server 3')
//     // res.send("3rd Response")
//     next()
// },
// (req,res,next) =>{
//     console.log('Handling   the route server 4')
//     // res.send("4th Response")
//     next()
// }
// )

// TODO: GET /users => middleware chain => Request Handlers

// app.use("/", (req,res,next)=>{
//     // res.send("Handling / route")
//     next()
// })

// app.get('/users',(req,res,next)=>{
//     console.log('route handler 2')
//     // res.send('Response 2 !!')
//     next()
// }) 

// app.use('/users',(req,res,next)=>{
//     console.log('route Handler 1')
//     // next()
//     res.send()
// })

//? Middlewares ---------------------------------------------------------------------------

// const adminAuth = require("./middleware/AdminAuth")
const {AdminAuth, UserAuth} = require("./middleware/auth")

// Handle Auth Middleware for all request GET, POST
// app.use , app.all
// app.use("/admin", (req, res, next)=>{
//     const token = "xyz"
//     const isAdminAuthorized = token === "xyz"
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized Request")
//     }else{
//     next()
//     }
// })

// app.use("/admin", AdminAuth)
// app.get("/user", UserAuth, (req,res)=>{
//     res.send("User Data is sent")
// })

// app.get('/admin/getAllData',(req,res)=>{
//     // Logic of fetching all data 
//     // Logic of Checking if the request is authorized 
//         res.send('All Data sent')
// })

// app.get('/admin/deleteUser',(req,res)=>{
//     // Logic of fetching all data 
//     res.send('Deleted a User')
// })

//* --------------------------------------------------------------------
// app.use("/", (err,req,res,next)=>{
//     if(err){
//         // Log your error
//         res.status(500).send("Something went wrong !")
//     }
// })

// app.get('/getUserData',(req,res)=>{
    // try{
    //     // Logic of DB call and get user data
    //     throw new Error('random Error')
    //     res.send("User data sent")
    // }catch(err){
    //     res.status(500).send('Something went wrong !Please contact support team ')
    // }
//     throw new Error('random Error')   // -- Does not handle the error, provide error template
//     res.send("User data sent")
// })
// app.use("/", (err,req,res,next)=>{
//     if(err){
//         // Log your error
//         res.status(500).send("Something went wrong !")
//     }
// })

//! Dummy Object for Signup
// const userObj = {
    //     firstName: "Sachin",  
    //     lastName: "Tendulkar",
    //     email:"sachin@gmail.com",
    //     password:'sachin321',
    //     // _id: "507f1f77bcf86cd799439011" -- unique id with 24 hex character string
    // }