const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email",
    },
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    // required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", schema);




//schema for storing result 

const schema2 = mongoose.Schema({
  EM:{
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },                                                                 
      message: "Invalid email",
    },
  },
  CN:{
    type:String,
    required:true
  },
  TM:{
    type:Number,
    required:true
  },
  OM:{
    type:Number,
    required:true
  },
  S:{
    type:Number,
    required:true
  },
  GR:{
    type:String,
    required:true
  },
});

const result = mongoose.model("result", schema2);

// Correct the export statement
module.exports = {user,result};
