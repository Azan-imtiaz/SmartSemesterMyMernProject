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
});

const user = mongoose.model("user", schema);

// Correct the export statement
module.exports = user;
