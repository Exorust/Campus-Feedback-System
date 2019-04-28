const express = require("express");
const router = express.Router();
const PollModel = require("../models/poll");

// get a list of ninjas from the db
router.get("/", (req, res) => {
  PollModel.find()
    .sort({ date: -1 })
    .then(poll => res.json(poll));
});

router.get("/:id", (req, res) => {
  PollModel.findById(req.params.id).then(poll => res.json(poll.options));
});

// add a new ninja to the db
router.post("/", (req, res) => {
  var poll = new PollModel({
    studentid: req.body.id,
    pollQuestion: req.body.poll,
    domain: req.body.domain,
    date: Date.now()
  });
  poll.save().then(feed => res.send(feed));
});

router.put("/options/:id/:option", (req, res) => {
  var polloption = { option: req.params.option, count: 0 };
  PollModel.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { options: polloption } }
  ).then(poll => console.log(poll));
});

router.put("/responsedit/:id/:responsemsg", (req, res) => {
  PollModel.findByIdAndUpdate(
    { _id: req.params.id },
    { response: req.params.responsemsg },
    function(response) {}
  )
});

router.delete("/:id", (req, res) => {
  PollModel.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
