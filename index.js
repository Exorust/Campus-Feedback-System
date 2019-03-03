const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// set up express app
const app = express();

app.use(cors());
// connect to mongodb
mongoose
  .connect("mongodb://localhost/campusfeedback")
  .then(console.log("mogodb connected"));
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api/feedback", require("./routes/api"));

// listen for requests
app.listen(process.env.port || 4000, function() {
  console.log("now listening for requests");
});
