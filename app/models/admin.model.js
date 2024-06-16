const sql = require('./db.js');
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);


class Admin {
  constructor(admin) {
    this.account = admin.account;
    this.password = admin.password;
  }
  async login(result) {
    try {
      const res1 = await queryAsync("SELECT * FROM admin WHERE account=?", [this.account]);
      if (!res1.length) {
        const errorMessage = `[This account does not exist]${this.account}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }
      if (res1[0].password != this.password) {
        const errorMessage = `[Password is incorrect]`;
        const newError = new Error(errorMessage);
        throw (newError);
      }
      const adminId = res1[0].id;
      console.log("admin logged in: ", { id: adminId, ...this });
      result(null, { id: adminId, ...this });
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }
}

module.exports = Admin;