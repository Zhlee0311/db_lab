const sql = require('./db.js');
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);


class Post {
  constructor(post) {
    this.picture = post.picture;
    this.content = post.content;
    this.poster = post.poster;
    this.deleter = post.deleter;
  }
  static async addPost(newPost, result) {
    try {
      const res1 = await queryAsync("INSERT INTO post(picture,content,poster) VALUES(?,?,?)",
        [newPost.picture, newPost.content, newPost.poster]);
      const postId = res1.insertId;
      const res2 = await queryAsync("UPDATE post SET prefix_id=? WHERE id=?",
        ["post" + postId, postId]);

      console.log("post added:", { id: postId, ...newPost });
      result(null, { id: postId, ...newPost });
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }
}



module.exports = Post;
