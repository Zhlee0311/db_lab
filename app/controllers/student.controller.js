const Student = require("../models/student.model.js");


exports.addStudent = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const student = new Student({
    name: req.body.name,
    sex: req.body.sex,
    master: req.body.master
  });

  Student.addStudent(student,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the Student."
        });
      else res.send(data);
    }
  );

}

