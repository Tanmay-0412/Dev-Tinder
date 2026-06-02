// creating a server to listen the incoming requests from outside world,
// With the help of Express Js
const express = require("express");
const cors = require('cors');
const app = express(); // instance of express server
const { connectDb } = require("./config/database");
require("./config/database");
const userModel = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utlis/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { UserAuth } = require("./middleware/auth")

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173", // whitelisting the origin domain name
  credentials :true
}))

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

connectDb() 
  .then(() => {                                                                                                                                                                                                                 
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000....");
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });

// mongodb+srv://tanmaysawant01_db_user:root%402001@notesapp.gwiaszp.mongodb.net/
