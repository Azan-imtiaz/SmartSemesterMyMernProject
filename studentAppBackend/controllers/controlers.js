const express = require("express");
const user = require("../model/schema");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

exports.getReq = async function (req, res) {


  const { email, password, degree,semester,username } = req.body;

  try {
    const alreadyExistOrNot = await user.findOne({ email: email });

    if (alreadyExistOrNot) {
      return res.status(200).json({st:300,d:"Email already exists"});
    } else {
      const fileName = req.file ? req.file.filename : '';  // Use req.file.filename if available, otherwise, set it to an empty string
      // const hashedPassword = await bcrypt.hash(password, 10);

      const result = await user.create({
        email: email,
        password: password,
        degree: degree,
        fileName: fileName,
        username: username,
        semester: semester,
      });

      res.status(200).json({st:200,d:"Registered"});
    }
  } catch (err) {
  
    res.status(200).json({st:500});
  }
};

exports.loginFunc = async function (req, res) {
  const { email, password } = req.body;
  try {
    const foundUser = await user.findOne({ email: email });
    if (!foundUser) {
      return res.status(200).json({st:400,d:"Credintial wrong"});
    }
    // const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (password != foundUser.password) {
      return res.status(200).json({st:400,d:"Credintial wrong"});
    }
    const token = await jwt.sign(foundUser.email, SECRET_KEY);
    // res.cookie('key9', token);   //in postman its working but in browser not i dont know why

    res.status(200).json({st:200,d:token,e:email});

  } catch (error) {
    
    res.status(200).json({st:500,d:"Server error"});
  
  }
};

exports.tokenCheck = async function (req, res) {


  try {
    console.log(req.body.id);
    if (req.body.id) {
      const correctToken = await jwt.verify(req.body.id, SECRET_KEY);
      console.log(correctToken)
      if (correctToken) {
        return res.status(200).json("Done");
      } else {
        return res.status(400).json("Not done");
      }
    }
    return res.status(400).json("not done");
  } catch (err) {
    return res.status(400).json("server issue");
  }
};




exports.getDataForProfile=async function(req,res){
 try{

   const foundUser = await user.findOne({ email: req.body.value });
   if (!foundUser) {
     return res.status(200).json({st:400,d:"Credintial wrong"});
    } 
    console.log(foundUser);
    res.status(200).json({st:200,foundUser});
  }
  catch(err){
    res.status(200).json({st:500,d:"server error"});
  }
}

exports.updateData = async function (req, res) {
  const userId = req.query.id; // Assuming id is in the URL parameters
   console.log(req.query.id)
  try {
    // Step 1: Find the document with the given id
    const foundUser = await user.findById(userId);

    // Step 2: Check if the new email already exists in the database
    const emailExists = await user.findOne({
      email: req.body.email,
      _id: { $ne: userId }, // Exclude the current user's ID
    });

    console.log("Found User:", foundUser);
    console.log("Email Exists:", emailExists);

    if (emailExists) {
      console.log("Email already exists for another user");
      return res.status(200).json({ st: 400, d: "Email already exists for another user" });
    }

    // Step 3: Update the document with the new data
    foundUser.email = req.body.email;
    foundUser.username = req.body.username;
    foundUser.password=req.body.password;
    foundUser.semester=req.body.semester;
    foundUser.degree=req.body.degree;
   
    // Add other fields you want to update

    if (req.file && req.file.filename) {
      foundUser.fileName = req.file.filename;
    }

    await foundUser.save();
    console.log(foundUser);

    res.status(200).json({ st: 200, foundUser });
  } catch (err) {
    console.error(err);
    res.status(200).json({ st: 500, d: "Server error" });
  }
};
