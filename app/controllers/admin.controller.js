const Admin = require('../models/admin.model.js');

const tokenEncode = require('../public/encode.js').tokenEncode;

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const admin = new Admin(
    {
      account: req.body.account,
      password: req.body.password
    }
  )

  admin.login(
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while login the Admin."
        })
      }
      else {
        const token = tokenEncode(data);
        res.cookie('token', token,
          {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
          });
        res.json({ message: 'login success', ...data });
      }
    }
  )

}