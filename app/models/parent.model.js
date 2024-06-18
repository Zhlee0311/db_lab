const sql = require("./db.js");
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);


class Parent {
  constructor(parent) {
    this.name = parent.name;
    this.sex = parent.sex;
    this.child = parent.child;//这里需要孩子的id（前端提示学号）
    this.phone = parent.phone;
    this.password = parent.password;
  }

  static async register(newParent, result) {
    try {
      const res1 = await queryAsync("SELECT * FROM student WHERE id=?", newParent.child);
      if (!res1.length) {
        const errorMessage = `[The student with this id does not exist]${newParent.child}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }

      const res2 = await queryAsync("SELECT * FROM parent WHERE child=?", newParent.child);
      if (res2.length) {
        const errorMessage = `[The student has been bound to a parent,please check your input]${newParent.child}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }

      const res3 = await queryAsync("SELECT * FROM parent WHERE phone=?", newParent.phone);
      if (res3.length) {
        const errorMessage = `[The phone number has been registered, please check your input] ${newParent.phone}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }
      
      const res4 = await queryAsync("SELECT *FROM teacher WHERE phone=?", newParent.phone);
      if (res4.length) {
        const errorMessage = `[The phone number has been registered, please check your input] ${newParent.phone}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }

      const res5 = await queryAsync("INSERT INTO parent(name,sex,child,phone,password) VALUES(?,?,?,?,?)",
        [newParent.name, newParent.sex, newParent.child, newParent.phone, newParent.password]
      );
      const parentId = res5.insertId;

      const res6 = await queryAsync("UPDATE parent SET prefix_id=? WHERE id=?",
        ["parent" + parentId, parentId]
      );

      console.log("parent registered: ", { id: parentId, ...newParent });
      result(null, { id: parentId, ...newParent });

    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }

  async login(result) {
    try {
      const res1 = await queryAsync("SELECT * FROM parent WHERE phone =?", this.phone);
      if (!res1.length) {
        const errorMessage = `[The phone number has not been registered, please check your input] ${this.phone}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }
      if (res1[0].password != this.password) {
        const errorMessage = `[The password is incorrect, please check your input]`;
        const newError = new Error(errorMessage);
        throw (newError);
      }

      console.log("parent logged in:", { ...res1[0] });
      result(null, { ...res1[0] });
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }
}

module.exports = Parent;