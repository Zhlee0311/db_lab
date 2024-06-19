const sql = require('./db.js');
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);


class Class {
  constructor(anotherClass) {
    this.school = anotherClass.school;
    this.name = anotherClass.name;
    this.profile = anotherClass.profile;
  }

  static async addClass(newClass, result) {
    try {
      const res1 = await queryAsync("SELECT * FROM class WHERE school =? AND name =?",
        [newClass.school, newClass.name]);
      if (res1.length) {
        const errorMessage = `[This school already has a class with the name]${newClass.name}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }
      const res2 = await queryAsync("INSERT INTO class(school,name,profile) VALUES(?,?,?)",
        [newClass.school, newClass.name, newClass.profile]);
      const classId = res2.insertId;

      const res3 = await queryAsync("UPDATE class SET prefix_id =? WHERE id=?",
        ["class" + classId, classId]);

      const res4 = await queryAsync("SELECT COUNT(*) as number FROM class WHERE school =?",
        [newClass.school]);
      const number = res4[0].number;

      console.log("class added:", { id: classId, ...newClass, number: number });
      result(null, { id: classId, ...newClass, number: number });
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }

  static async showClass(school, result) {
    try {
      const res1 = await queryAsync(
        "SELECT class.*, teacher.name as master_name, COUNT(student.id) as student_num " +
        "FROM class " +
        "LEFT JOIN teacher ON class.master = teacher.id " +
        "LEFT JOIN student ON class.id = student.class " +
        "WHERE class.school = ? " +
        "GROUP BY class.id",
        [school]
      );
      console.log("class showed:", res1);
      result(null, res1);
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }


}

module.exports = Class;