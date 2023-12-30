const express = require("express");
const { user, result } = require("../model/schema");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

exports.getReq = async function (req, res) {


  const { email, password, degree, semester, username } = req.body;

  try {
    const alreadyExistOrNot = await user.findOne({ email: email });

    if (alreadyExistOrNot) {
      return res.status(200).json({ st: 300, d: "Email already exists" });
    } else {
      const fileName = req.file ? req.file.filename : '';  // Use req.file.filename if available, otherwise, set it to an empty string
      // const hashedPassword = await bcrypt.hash(password, 10);

      const resultt = await user.create({
        email: email,
        password: password,
        degree: degree,
        fileName: fileName,
        username: username,
        semester: semester,
      });

      res.status(200).json({ st: 200, d: "Registered" });
    }
  } catch (err) {

    res.status(200).json({ st: 500 });
  }
};

exports.loginFunc = async function (req, res) {
  const { email, password } = req.body;
  try {
    const foundUser = await user.findOne({ email: email });
    if (!foundUser) {
      return res.status(200).json({ st: 400, d: "Credintial wrong" });
    }
    // const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (password != foundUser.password) {
      return res.status(200).json({ st: 400, d: "Credintial wrong" });
    }
    const token = await jwt.sign(foundUser.email, SECRET_KEY);
    // res.cookie('key9', token);   //in postman its working but in browser not i dont know why

    res.status(200).json({ st: 200, d: token, e: email });

  } catch (error) {

    res.status(200).json({ st: 500, d: "Server error" });

  }
};

exports.tokenCheck = async function (req, res) {


  try {
    console.log(req.body.id);
    if (req.body.id) {
      const correctToken = await jwt.verify(req.body.id, SECRET_KEY);
     
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




exports.getDataForProfile = async function (req, res) {
  try {

    const foundUser = await user.findOne({ email: req.body.value });
    if (!foundUser) {
      return res.status(200).json({ st: 400, d: "Credintial wrong" });
    }
 
    res.status(200).json({ st: 200, foundUser });
  }
  catch (err) {
    res.status(200).json({ st: 500, d: "server error" });
  }
}

exports.updateData = async function (req, res) {
  const userId = req.query.id; // Assuming id is in the URL parameters

  try {
    // Step 1: Find the document with the given id
    const foundUser = await user.findById(userId);

    // Step 2: Check if the new email already exists in the database
    const emailExists = await user.findOne({
      email: req.body.email,
      _id: { $ne: userId }, // Exclude the current user's ID
    });

   
    if (emailExists) {
      console.log("Email already exists for another user");
      return res.status(200).json({ st: 400, d: "Email already exists for another user" });
    }

    // Step 3: Update the document with the new data
    foundUser.email = req.body.email;
    foundUser.username = req.body.username;
    foundUser.password = req.body.password;
    foundUser.semester = req.body.semester;
    foundUser.degree = req.body.degree;

    // Add other fields you want to update

    if (req.file && req.file.filename) {
      foundUser.fileName = req.file.filename;
    }

    await foundUser.save();
    

    res.status(200).json({ st: 200, foundUser });
  } catch (err) {
    console.error(err);
    res.status(200).json({ st: 500, d: "Server error" });
  }
};



// Api end point to store result
exports.storeResult = async (req, res) => {
  const { CourseName, TotalM, ObtainedM, Semester, Grade, Email } = req.body;

  try {
   const check=await user.findOne({email:Email});
   if(!check){
    return res.status(200).json({ st: 300, d: "email not found" });
   }


    const data = await result.create({
      CN: CourseName,
      TM: TotalM,
      OM: ObtainedM,
      S: Semester,
      GR: Grade,
      EM: Email

    });

    res.status(200).json({ st: 200, d: "Added successfully" });

  } catch (e) {
    console.error(e.message);
    res.status(200).json({ st: 500, data: "Internal Server Error" });
  }
};


//api end point to get result

exports.getResult = async function (req, res) {
  const { email} = req.body;
  try {
    const data = await result.find({ EM: email });
    console.log(data)
    if (data.length > 0) {
     
      return res.status(200).json({ st: 200, d: data });
    }

    return res.status(200).json({ st: 300, d: "Sorry, no documents found" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ st: 500, d: "Server error" });
  }
};

//api to update result item 
exports.updateResultItem = async function (req, res) {
  const { id, CourseName, TotalM, ObtainedM, Semester, Grade } = req.body;
  try {
    const data = await result.updateOne({ _id: id }, {
      $set: {
        CN: CourseName,
        TM: TotalM,
        OM: ObtainedM,
        S: Semester,
        GR: Grade,
      }
    });
   console.log(data);
    if (data. matchedCount > 0) {
      return res.status(200).json({ st: 200, d: "Successfully updated data" });
    }
    return res.status(300).json({ st: 300, d: "Not successfully updated data" });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ st: 300, d: "Internal server error" });
  }
}


// api to get Single result item

exports.getResultItem = async (req, res) => {

  const { id } = req.body;

  try {
    const data = await result.findOne({ _id: id });
    // console.log(data);
    if (data) {
      return res.status(200).json({ st: 200, d: data });
    }

    return res.status(200).json({ st: 300, d: "Sorry, no document found" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ st: 500, d: "Server error" });
  }
}

// api to delete result item  
exports.deleteResultItem = async (req, res) => {
  // Extract the 'id' from the request body
  const { id } = req.body;

  try {
    // Attempt to delete the document with the specified '_id' from the 'result' collection

    const data = await result.deleteOne({ _id: id });

    // Check if a document was deleted
    
    if (data.deletedCount > 0) {
      return res.status(200).json({ st: 200, d: data });
    }

    // If no document was deleted, return a response indicating that no document was found
    return res.status(200).json({ st: 300, d: "Sorry, no document found" });
  } catch (err) {
    // Handle any errors that occur during the deletion process
    console.error(err.message);
    return res.status(500).json({ st: 500, d: "Server error" });
  }
};

