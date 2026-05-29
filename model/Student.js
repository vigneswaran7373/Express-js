const mongoose = require("mongoose");

const studentschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentschema);
