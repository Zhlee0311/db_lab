const sql = require('./db.js');
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);



class Public {

  static async userInfo(id, prefix_id, result) {
    let user_type = null;

    if (prefix_id.startsWith('teacher')) {
      user_type = 'teacher';
    }
    else if (prefix_id.startsWith('parent')) {
      user_type = 'parent';
    }

    if (user_type == 'teacher') {
      try {
        let ismaster = 0;
        const res1 = await queryAsync("SELECT * FROM teacher WHERE id =?", id);
        const res2 = await queryAsync("SELECT * FROM class WHERE master =?", id);
        if (res2.length) {
          ismaster = 1;
        }
        const res3 = await queryAsync("SELECT * FROM class WHERE id=(SELECT class FROM teacher WHERE id=?)", id);
        const res4 = await queryAsync("SELECT * FROM school WHERE id=(SELECT school FROM class WHERE id=(SELECT class FROM teacher WHERE id=?))", id);

        console.log("user info:", {
          teacher:
          {
            ...res1[0],
            ismaster: ismaster,
          },
          class:
          {
            ...res3[0]
          },
          school:
          {
            ...res4[0]
          },
          user_type:
            user_type
        });

        result(null, {
          teacher:
          {
            ...res1[0],
            ismaster: ismaster,
          },
          class:
          {
            ...res3[0]
          },
          school:
          {
            ...res4[0]
          },
          user_type:
            user_type
        })
      }
      catch (err) {
        console.log(err);
        result(err, null);
      }
    }
    else if (user_type == 'parent') {
      try {
        const res1 = await queryAsync("SELECT * FROM parent WHERE id =?", id);
        const res2 = await queryAsync("SELECT * FROM student WHERE id =?", res1[0].child);
        const res3 = await queryAsync("SELECT * FROM class WHERE id=?", res2[0].class);
        const res4 = await queryAsync("SELECT * FROM school WHERE id=?", res3[0].school);

        console.log("user info:", {
          parent:
          {
            ...res1[0]
          },
          student:
          {
            ...res2[0]
          },
          class:
          {
            ...res3[0]
          },
          school:
          {
            ...res4[0]
          },
          user_type:
            user_type
        });
        result(null,
          {
            parent:
            {
              ...res1[0]
            },
            student:
            {
              ...res2[0]
            },
            class:
            {
              ...res3[0]
            },
            school:
            {
              ...res4[0]
            },
            user_type:
              user_type
          }
        );
      }
      catch (err) {
        console.log(err);
        result(err, null);
      }
    }
  }

}

module.exports = Public;