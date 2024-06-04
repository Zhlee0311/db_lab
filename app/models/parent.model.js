const sql = require("./db.js");

class Parent {
  constructor(parent) {
    this.phone = parent.phone;
    this.password = parent.password;
  }

  static register = (newParent, result) => {
    sql.query("INSERT INTO parent (phone,password) VALUES (?,?)", [newParent.phone, newParent.password], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("registered parent: ", { id: res.insertId, ...newParent });
      result(null, { id: res.insertId, ...newParent });
    });
  }
}

module.exports = Parent;