// creating a server to listen the incoming requests from outside world,
// With the help of Express Js
const express = require("express");
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

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


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
