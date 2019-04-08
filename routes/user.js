const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/auth/:loginid/:password", (req, res) => {
  const loginid = req.params.loginid;
  console.log(loginid);
  const password = req.params.password;
  console.log(password);
  Student.findOne({ loginid }, (err, student) => {
    //res.json(student["password"]);

    if (student.password === password) {
      const data = {
        isstudent: student.isstudent,
        response: "yes"
      };
      res.json(data);
    } else res.send("fuck off");
  }).catch(err => res.status(404).json({ success: false }));
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

module.exports = router;
