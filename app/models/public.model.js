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
      }
      catch (err) {
        console.log(err);
        result(err, null);
      }

    }
    else if (user_type == 'parent') {

    }


  }
}