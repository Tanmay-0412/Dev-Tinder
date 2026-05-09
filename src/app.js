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

// Post Api -- Signup
app.post("/signup", async (req, res) => {
  try {
    //* Validation of Data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, gender, skills, mobileNo} = req.body;

    //* Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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

app.post("/login", async (req, res) => {
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

//Get profile data of the User
app.get("/profile", UserAuth, async (req, res) => {
  try {  
    const user = req.user
    console.log("Logged In user is:" + user.firstName);
    res.send(user)
  } catch (err) {
    res.status(400).send("Profile fetch Error: " + err.message);
  }
});

//Send connection request
app.post('/sendConnectionRequest', UserAuth, async (req,res)=>{
    const user = req.user
    // Sending a connection request  
    res.send(user.firstName + " has sent you a connection request")

})

// Get user by email
app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  const users = await userModel.findOne({ emailId: userEmail });
  if (!users) {
    res.status(400).send("User not Found");
  } else {
    res.send(users);
  }
  // const userEmail = req.query.emailId  -- get All
  // const userEmail = req.body.emailId
  // try{
  //     const users = await userModel.find({emailId: userEmail})
  //     if(users.length === 0){
  //         res.status(400).send("User Not Found !")
  //     }else{
  //     res.send(users)
  //     }
  // }
  // catch(err){
  //     res.status(400).send("Something went wrong !")
  // }
});

// Feed API - GET method - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong !");
  }
});

app.get("/getuserbyid", async (req, res) => {
  const userid = req.body._id;
  console.log(userid);
  const users = await userModel.findById(userid);
  res.send(users);
});

// Delete APi -- delete an user by id
app.delete("/deleteuser", async (req, res) => {
  const userid = req.body.userId;
  console.log(userid);
  try {
    // const user = await userModel.findByIdAndDelete({_id: userid})
    const user = await userModel.findByIdAndDelete(userid);
    res.send("User Delete successfully");
  } catch (err) {
    res.status(400).send("Something went wrong !");
  }
});

// Update API - update an user in database - findByIdAndUpdate & findOneAndUpdate
app.patch("/users/:userId", async (req, res) => {
  const userid = req.params.userId;
  //  const userid = req.body._id
  const data = req.body;

  try {
    const Allowed_Updates = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    //Every field should be present in Allowed_Updates Array
    const isUpateAllowed = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k),
    );
    if (!isUpateAllowed) {
      throw new Error("Update field not allowed");
    }

    // if(data.skills.length > 10){
    //     throw new Error("Skills cannot be more than 10")
    // }
    // const users = await userModel.findOneAndUpdate({_id:userid}, data, {returnDocument:"after"})
    const users = await userModel.findByIdAndUpdate(userid, data, {
      runValidators: true,
    });
    res.send("User updated successfully !");
  } catch (err) {
    res.status(400).send("Update Failed :" + err.message);
    // res.status(400).json({ error: err.message });
  }
});

// API -- Update the user with the emailId
app.patch("/usersEmail", async (req, res) => {
  const userEmail = req.body.emailId;
  const query = req.body;
  console.log(query);
  try {
    const users = await userModel.findOneAndUpdate(
      { emailId: userEmail },
      query,
    );
    console.log(users);
    res.send("User updation completed with email");
  } catch (err) {
    res.status(400).send("Something went wrong !");
  }
});

connectDb()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });

// mongodb+srv://tanmaysawant01_db_user:root%402001@notesapp.gwiaszp.mongodb.net/
