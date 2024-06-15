const Teacher = require("../models/teacher.model.js");

const tokenEncode = require("../public/encode.js").tokenEncode;


exports.register = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const teacher = new Teacher(
    {
      name: req.body.name,
      sex: req.body.sex,
      school: req.body.school,
      class: req.body.class,
      subject: req.body.subject,
      phone: req.body.phone,
      password: req.body.password,
      ismaster: req.body.ismaster
    }
  );

  Teacher.register(teacher, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the Teacher."
      });
    else res.send(data);
  }
  )
};

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const teacher = new Teacher({
    name: req.body.name || null,
    sex: req.body.sex || null,
    school: req.body.school || null,
    class: req.body.class || null,
    subject: req.body.subject || null,
    phone: req.body.phone,//必需
    password: req.body.password,//必需
  })

  teacher.login((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while login the Teacher."
      });
    }
    else {
      const token = tokenEncode(data);
      // 设置 cookie，有效期为 30 天，httpOnly 和 secure
      res.cookie('token', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
      res.json({ message: 'login success' });
    }
  }
  )
};



