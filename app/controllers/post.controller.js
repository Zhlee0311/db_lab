const Post = require('../models/post.model.js');

exports.addPost = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const post = new Post(
    {
      picture: req.body.picture,
      content: req.body.content,
      poster: req.user.prefix_id,
      deleater: null
    }
  )

  Post.addPost(post,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while adding the Post."
        })
      }
      else {
        res.json(
          {
            message: 'Post added successfully',
            ...data
          }
        )
      }
    }
  )
}