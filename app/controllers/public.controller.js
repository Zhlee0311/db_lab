const Public = require("../models/public.model.js");

exports.userInfo = (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }

  const id = req.user.id;
  const prefix_id = req.user.prefix_id;

  Public.userInfo(id, prefix_id,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while showing the user info."
        })
      }
      else {
        res.json(data);
      }
    }
  )

}