const sql = require('./db.js');

class Student {
  constructor(student) {
    this.name = student.name;
    this.sex = student.sex;
    this.master = student.master;//班主任的id
  }

  static addStudent(newStudent, result) {
    sql.query("SELECT id FROM class WHERE master =?", newStudent.master,
      (err1, res1) => {
        if (err1) {
          const errorMessage = `[Failed to select class of the master:]${err1.message}`;
          const newError = new Error(errorMessage);
          console.error(newError);
          result(newError, null);
          return;
        }
        if (res1.length) {
          const classId = res1[0].id;
          sql.query("INSERT INTO student(name,sex,class) VALUES(?,?,?)",
            [newStudent.name, newStudent.sex, classId],
            (err2, res2) => {
              if (err2) {
                const errorMessage = `[Failed to insert student:]${err2.message}`;
                const newError = new Error(errorMessage);
                console.error(newError);
                result(newError, null);
                return;
              }
              const studentId = res2.insertId;
              const prefixId = "student" + studentId;
              sql.query("UPDATE student SET prefix_id =? WHERE id =?", [prefixId, studentId],
                (err3, res3) => {
                  if (err3) {
                    const errorMessage = `[Failed to update student prefix_id:]${err3.message}`;
                    const newError = new Error(errorMessage);
                    console.error(newError);
                    result(newError, null);
                    return;
                  }
                }
              )
              console.log("student added:", { id: res2.insertId, ...newStudent });
              result(null, { id: res2.insertId, ...newStudent });
              return;
            }
          )
        }
        else {
          result({ message: "class_not_found" }, null);
          return;
        }
      }
    )
  }


}

module.exports = Student;