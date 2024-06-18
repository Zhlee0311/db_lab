const Post = require('../models/post.model.js');

exports.addPost = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
    return;
  }

  const post = new Post(
    {
      picture: req.body.picture,
      content: req.body.content,
      poster: req.user.prefix_id,
      deleter: null
    }
  )

  Post.addPost(post,
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message || "Some error occurred while adding the Post."
        })
      }
      else {
        res.json({
          message: 'Post added successfully',
          ...data
        })
      }
    }
  )
}