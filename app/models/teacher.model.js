const sql = require('./db.js');
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);



class Teacher {
  constructor(teacher) {
    this.name = teacher.name;
    this.sex = teacher.sex;
    this.school = teacher.school;//学校名称
    this.class = teacher.class;//班级名称
    this.subject = teacher.subject;
    this.phone = teacher.phone;
    this.password = teacher.password;
    this.ismaster = teacher.ismaster;
  }
  static async register(newTeacher, result) {
    try {
      let schoolId = null;
      let classId = null;
      let teacherId = null;
      const res1 = await queryAsync("SELECT id FROM school WHERE name=?", newTeacher.school);
      if (!res1.length) {
        const errorMessage = `[The school does not exist, please check your input] ${newTeacher.school}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }
      schoolId = res1[0].id;
      const res2 = await queryAsync("SELECT id FROM class WHERE name =? AND school =?", [newTeacher.class, schoolId]);
      if (!res2.length) {
        const errorMessage = `[The class does not exist, please check your input] ${newTeacher.class}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }
      classId = res2[0].id;
      const res3 = await queryAsync("SELECT * FROM teacher WHERE phone =?", newTeacher.phone);
      if (res3.length) {
        const errorMessage = `[The phone number has been registered, please check your input] ${newTeacher.phone}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }

      const res4 = await queryAsync("SELECT * FROM parent WHERE phone =?", newTeacher.phone);
      if (res4.length) {
        const errorMessage = `[The phone number has been registered, please check your input] ${newTeacher.phone}`;
        const newError = new Error(errorMessage);
        throw (newError);
      }

      await queryAsync("START TRANSACTION");

      const res5 = await queryAsync(
        "INSERT INTO teacher(name,sex,class,subject,phone,password) VALUES(?,?,?,?,?,?)",
        [newTeacher.name, newTeacher.sex, classId, newTeacher.subject, newTeacher.phone, newTeacher.password]
      );

      teacherId = res5.insertId;

      await queryAsync(
        "UPDATE teacher SET prefix_id =? WHERE id =?",
        ["teacher" + teacherId, teacherId]
      );

      if (newTeacher.ismaster == 1) {
        const res6 = await queryAsync("SELECT master FROM class WHERE id =?", classId);
        if (res6[0].master != null) {
          const errorMessage = `[The class has been assigned a master, please check your input]${newTeacher.class}`;
          const newError = new Error(errorMessage);
          throw (newError);
        }
        await queryAsync("UPDATE class SET master =? WHERE id =?", [teacherId, classId]);
      }

      await queryAsync("COMMIT");

      console.log("teacher registered:", { id: teacherId, ...newTeacher });
      result(null, { id: teacherId, ...newTeacher });
    }
    catch (err) {
      await queryAsync("ROLLBACK");
      console.log(err);
      result(err, null);
    }
  }


  async login(result) {
    try {
      const res1 = await queryAsync("SELECT * FROM teacher WHERE phone =?", this.phone);
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
      let ismaster = 0;
      let classId = res1[0].class;
      let teacherId = res1[0].id;

      const res2 = await queryAsync("SELECT master FROM class WHERE id =?", classId);
      if (res2[0].master == teacherId) {
        ismaster = 1;
      }
      console.log("teacher logged in:", { ...res1[0], ismaster: ismaster });
      result(null, { ...res1[0], ismaster: ismaster })
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }




}

module.exports = Teacher;