const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create ninja Schema & model
const StudentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  loginid: {
    type: String,
    required: [true, "ID field is required"]
  },
  password: {
    type: String,
    required: [true, "Password field is required"]
  }
  // add in geo location
});

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = StudentModel;
