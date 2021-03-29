const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports = {
  addComment: async (req, res) => {
    try {
      const { name, text, postId } = req.body;
      const comment = new Comment({ name, text, postId });

      await comment.save();

      const post = await Post.findById(postId);
      post.comments.unshift(comment._id);
      await post.save();

      res.status(201).json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};
