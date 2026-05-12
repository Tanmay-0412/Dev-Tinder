const express = require('express')
const app = express()


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
