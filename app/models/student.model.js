const sql = require('./db.js');
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);


class Student {
  constructor(student) {
    this.name = student.name;
    this.sex = student.sex;
    this.master = student.master;//班主任的id
  }

  static async addStudent(newStudent, result) {
    try {
      const res1 = await queryAsync("SELECT id FROM class WHERE master =?", newStudent.master);
      const classId = res1[0].id;

      const res2 = await queryAsync("INSERT INTO student(name,sex,class) VALUES (?,?,?)",
        [newStudent.name, newStudent.sex, classId]
      );
      const studentId = res2.insertId;

      const res3 = await queryAsync("UPDATE student SET prefix_id=? WHERE id=?",
        ["student" + studentId, studentId]
      );

      const res4 = await queryAsync("SELECT COUNT(*) as number FROM student WHERE class =?", classId);
      const number = res4[0].number;//班级人数

      console.log("student added:", { id: studentId, name: newStudent.name, sex: newStudent.sex, class: classId, number: number })
      result(null, { id: studentId, name: newStudent.name, sex: newStudent.sex, class: classId, number: number });
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }

}

module.exports = Student;