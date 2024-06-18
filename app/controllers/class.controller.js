const Class = require('../models/class.model.js');

exports.addClass = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
    return;
  }

  const newClass = new Class(
    {
      school: req.user.school,
      name: req.body.name,
      profile: req.body.profile
    }
  );

  Class.addClass(newClass,
    (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            err.message || "Some error occurred while adding the class."
        })
      }
      else {
        res.json(data);
      }
    }
  );
}