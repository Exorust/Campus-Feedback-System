const express = require("express");
const router = express.Router();
const FeedbackModel = require("../models/feedback");
const Student = require("../models/student");

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
    feedback: req.body.feedback
  });
  feedback.save().then(feed => res.send(feed));
});

router.get("/auth/:loginid/:password", (req, res) => {
  const loginid = req.params.loginid;
  // console.log(loginid);
  const password = req.params.password;
  //console.log(password);
  Student.findOne({ loginid }, (err, student) => {
    //res.json(student["password"]);
    if (student.password === password) {
      const data = {
        isstudent: student.isstudent,
        response: "yes"
      };
      res.json(data);
    } else res.send("fuck off");
  });
});

router.post("/create", (req, res) => {
  var student = new Student({
    name: req.body.name,
    loginid: req.body.loginid,
    password: req.body.password,
    isstudent: req.body.isstudent
  });
  student.save().then(student => res.send(student));
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
