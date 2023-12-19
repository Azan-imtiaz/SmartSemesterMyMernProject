const express = require("express");
const user = require("../model/schema");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.getReq = async function (req, res) {


  const { email, password, degree, file } = req.body;

  try {
    const alreadyExistOrNot = await user.findOne({ email: email });

    if (alreadyExistOrNot) {
      return res.status(200).json({st:300,d:"Email already exists"});
    } else {
      const fileName = req.file ? req.file.filename : '';  // Use req.file.filename if available, otherwise, set it to an empty string
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await user.create({
        email: email,
        password: hashedPassword,
        degree: degree,
        fileName: fileName,
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
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(200).json({st:400,d:"Credintial wrong"});
    }
    const token = await jwt.sign(foundUser.email, SECRET_KEY);
    // res.cookie('key9', token);   //in postman its working but in browser not i dont know why

    res.status(200).json({st:200,d:"Login"});

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
