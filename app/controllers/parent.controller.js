const Parent = require("../models/parent.model.js");

exports.register = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  const parent = new Parent({
    phone: req.body.phone,
    password: req.body.password
  });

  Parent.register(parent, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the Parent."
      });
    else res.send(data);
  });

};






