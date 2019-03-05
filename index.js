const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// set up express app
const app = express();

app.use(cors());
// connect to mongodb
mongoose
  .connect("mongodb://gopeshkh1:gopesh123@ds149885.mlab.com:49885/alternate")
  .then(console.log("mogodb connected"));
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api/feedback", require("./routes/api"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// listen for requests
app.listen(process.env.port, function() {
  console.log("now listening for requests");
});
