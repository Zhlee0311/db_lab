const Student = require("../models/student.model.js");

exports.addStudent = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
    return;
  }

  const student = new Student({
    name: req.body.name,
    sex: req.body.sex,
    master: req.user.id
  });

  Student.addStudent(student,
    (err, data) => {
      if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while adding the Student."
        });
      else res.json(data);
    }
  );
}



exports.showStudent = (req, res) => {
  if (!req.user.class) {
    res.status(400).json({
      message: "You are not a teacher!"
    });
    return;
  }
  let classId = req.user.class;

  Student.showStudent(classId, (err, data) => {
    if (err) {
      req.status(500).json({
        message:
          err.message || "Some error occurred while showing the Student."
      });
    }
    else {
      res.json(data);
    }
  }
  )
}

