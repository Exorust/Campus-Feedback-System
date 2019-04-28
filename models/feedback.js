const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create ninja Schema & model
const FeedbackSchema = new Schema({
  studentid: {
    type: String,
    required: [true, "student field is required"]
  },
  feedback: {
    type: String
  },
  domain: {
    type: String
  },
  date: {
    type: Date
  },
  response: {
    type: String
  }
  // add in geo location
});

const FeedbackModel = mongoose.model("feedback", FeedbackSchema);

module.exports = FeedbackModel;
