const express = require('express');
const { validateSignUpData, validateLoginData } = require('../utlis/validation');
const userModel = require('../models/user');
const authRouter = express.Router()
const bcrypt = require("bcrypt");
// app.get and authRouter.get is similar
 

// Post Api -- Signup
authRouter.post("/signup", async (req, res) => {
  try {
    //* Validation of Data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, gender, skills, mobileNo} = req.body;

    //* Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // Creating a new instance of the User model
    const userObj = { firstName, lastName, emailId, password: passwordHash, gender, skills, mobileNo };
    const user = new userModel(userObj);

    await user.save();
    res.send("User Data saved successfully !");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
    // res.status(400).json({ error: err.message });
  }
});
 
// Login Api
authRouter.post("/login", async (req, res) => {
  try {
    // console.log(req.body)
    validateLoginData(req);
    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User does not exists");
    }

    //returns a boolean
    // const isPasswordValid = bcrypt.compare("Kalpit@123", "$2b$10$DAPKQH2vVxEOhaAmYhHYkur.GmjGLT3w.cl3VXs3YA4eE8kkQgpKy")
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {  
      //! Logic of Authentication
      //* Create a JWT Token
    //   const token = await jwt.sign({ _id: user._id }, "DevTinder@2026", {expiresIn :"0d"});
        const token = await user.getJWT();
      //* Add the token to cookie and send the response back to the user
      res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000)});
    //   console.log(new Date(Date.now() + 900000).toLocaleString());
      res.send("Login successful! ");
    } else {
      throw new Error("Password does not match! Try Again...");
    }
  } catch (err) {
    res.status(400).send("Login Failed :" + err.message);
  }
});

module.exports = authRouter
