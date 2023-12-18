const express = require("express");
const user= require("../model/schema");
var bcrypt = require('bcryptjs');

exports.getReq = async function (req, res) {
  // console.log(req.file);
  const { email, password, degree, file } = req.body;

  try {
    const alreadyExistOrNot = await user.findOne({ email: email });

    if (alreadyExistOrNot) {
      res.status(400).json("Email already exists");
    } else {
      const fileName = req.file ? req.file.filename : '';  // Use req.file.filename if available, otherwise, set it to an empty string
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await user.create({
        email: email,
        password: hashedPassword,
        degree: degree,
        fileName: fileName,
      });

      res.status(200).json({"email":email});
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json("Something wrong happened");
  }
};

exports.loginFunc = async function (req, res) {

  const { email, password } = req.body;

  try {
    const foundUser = await user.findOne({ email: email });

    if (!foundUser) {
      return res.status(400).json("User not registered");
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(400).json("Incorrect password");
    }
    //  res.cookie("key",foundUser.email);
    res.status(200).json("Login Successful");
  } catch (error) {
    res.status(500).json(error.message);
  }
};