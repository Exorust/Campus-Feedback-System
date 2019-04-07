const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create ninja Schema & model
const PollSchema = new Schema({
  studentid: {
    type: String,
    required: [true, "student field is required"]
  },
  pollQuestion: {
    type: String
  },
  domain: {
    type: String
  },
  date: {
    type: Date
  },
  options: [{ option: String, count: Number }]
  // add in geo location
});

const PollModel = mongoose.model("poll", PollSchema);

module.exports = PollModel;
