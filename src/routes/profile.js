const express = require('express')
const profileRouter = express.Router()
const { UserAuth } = require('../middleware/auth')

//Get profile data of the User
profileRouter.get("/profile", UserAuth, async (req, res) => {
  try {  
    const user = req.user 
    console.log("Logged In user is:" + user.firstName);
    res.send(user)
  } catch (err) {
    res.status(400).send("Profile fetch Error: " + err.message);
  }
});

module.exports = profileRouter
