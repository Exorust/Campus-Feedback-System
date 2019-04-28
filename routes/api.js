const express = require("express");
const router = express.Router();
const FeedbackModel = require("../models/feedback");

// get a list of ninjas from the db

router.get("/", (req, res) => {
  FeedbackModel.find()
    .sort({ date: -1 })
    .then(feedback => res.json(feedback));
});

// add a new ninja to the db
router.post("/", (req, res) => {
  var feedback = new FeedbackModel({
    studentid: req.body.id,
    feedback: req.body.feedback,
    domain: req.body.domain,
    date: Date.now()
  });
  feedback.save().then(feed => res.send(feed));
});

router.put("/responsedit/:id", (req, res) => {
  FeedbackModel.findByIdAndUpdate(
    { _id: req.params.id },
    { response: "done" },
    function(response) {}
  )
    
    .catch(err => res.send("failed"));
});

router.delete("/:id", (req, res) => {
  FeedbackModel.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
// // update a ninja in the db
// router.put('/ninjas/:id', function(req, res){
//     res.send({type: 'PUT'});
// });
//
// // delete a ninja from the db
// router.delete('/ninjas/:id', function(req, res){
//     res.send({type: 'DELETE'});
// });

module.exports = router;
