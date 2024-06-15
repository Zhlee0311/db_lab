const sql = require("./db.js");

class Parent {
  constructor(parent) {
    this.name = parent.name;
    this.sex = parent.sex;
    this.child = parent.child;//这里需要孩子的id（前端提示学号）
    this.phone = parent.phone;
    this.password = parent.password;
  }

  static register(newParent, result) {
    sql.query("INSERT INTO parent(name,sex,child,phone,password) VALUES(?,?,?,?,?)",
      [newParent.name, newParent.sex, newParent.child, newParent.phone, newParent.password],
      (err1, res1) => {
        if (err1) {
          const errorMessage = `[Failed to insert parent:]${err1.message}`;
          const newError = new Error(errorMessage);
          console.error(newError);
          result(newError, null);
          return;
        }
        const parentId = res1.insertId;
        const prefixId = "parent" + parentId;
        sql.query("UPDATE parent SET prefix_id=? WHERE id=?",
          [prefixId, parentId],
          (err2, res2) => {
            if (err2) {
              const errorMessage = `[Failed to update parent prefix_id:]${err2.message}`;
              const newError = new Error(errorMessage);
              console.error(newError);
              result(newError, null);
              return;
            }
          }
        )
        console.log("registered parent:", { id: res1.insertId, ...newParent });
        result(null, { id: res1.insertId, ...newParent })
        return;
      }
    )
  }

}

module.exports = Parent;