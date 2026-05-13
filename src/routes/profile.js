const express = require('express')
const profileRouter = express.Router()
const { UserAuth } = require('../middleware/auth');
const userModel = require('../models/user');
const { validateEditProfileData } = require('../utlis/validation');
const bcrypt = require('bcrypt')

//Get profile data of the User
profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {  
    const user = req.user 
    console.log("Logged In user is: " + user.firstName);
    res.send(user)
  } catch (err) {
    res.status(400).send("Profile fetch Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", UserAuth, async(req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request")
    }

    const userObj = req.body
    const user = req.user
    const loggedInUser = req.user

    Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key])
    await loggedInUser.save()

    // const userUpdate = await userModel.findByIdAndUpdate(user._id, userObj)
    // const userUpdate = await userModel.findOneAndUpdate({_id:user._id}, userObj)
    // console.log(userUpdate)

    // res.send( loggedInUser.firstName + " your profile updated successfully !")
    res.json({message: `${loggedInUser.firstName} your profile updated successfully !`, data : loggedInUser})
  }catch(err){
    res.status(400).send("Profile Fetch failed : " + err.message)
  }
})

profileRouter.patch("/profile/password", UserAuth, async(req,res)=>{
  try {
    const user = req.user
    const newPassword = req.body.newPassword
    const currentEnteredPassword = req.body.currentPassword
    console.log(user.password)
    // Compare and match the exisiting passwords
    const isPasswordMatch = await bcrypt.compare(currentEnteredPassword, user.password)

    if(isPasswordMatch){
      // Update the new password
      const hashNewPassword = await bcrypt.hash(newPassword,10)
      user.password = hashNewPassword 
      await user.save()
    }else{
      throw new Error('Password mismatch error !')
    }
    // res.send("Password updated successfully !")
    res.json({message: `${user.firstName}, your password has been successfully updated !`})

  }catch(err){
    res.status(400).send("Password Update Failed : " + err.message)
  }
})

module.exports = profileRouter
