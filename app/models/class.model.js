const sql = require('./db.js');

class Class {
  constructor(anotherClass) {
    this.school = anotherClass.school;
    this.name = anotherClass.name;
    this.profile = anotherClass.profile;
  }

  static addClass(newClass, result) {
    sql.query("INSERT INTO class (school,name,profile) VALUES (?,?,?)",
      [newClass.school, newClass.name, newClass.profile],
      (err1, res1) => {
        if (err1) {
          const errorMessage = `[Failed to insert class:]${err1.message}`;
          const newError = new Error(errorMessage);
          console.error(newError);
          result(newError, null);
          return;
        }

        const classId = res1.insertId;
        const prefixId = "class" + classId;

        sql.query("UPDATE class SET prefix_id =? WHERE id =?", [prefixId, classId], (err2, res2) => {
          if (err2) {
            const errorMessage = `[Failed to update class prefix_id:]${err2.message}`;
            const newError = new Error(errorMessage);
            console.error(newError);
            result(newError, null);
            return;
          }
          console.log("class added:", { id: res1.insertId, ...newClass });
          result(null, { id: res1.insertId, ...newClass });
          return;
        }
        )
      })
  }

}

module.exports = Class;