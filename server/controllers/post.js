const Post = require("../models/post");
const Hit = require("../models/hit");

module.exports = {
  getPosts: async (req, res) => {
    const pageSize = 3;
    const page = parseInt(req.query.page) || 1;
    const skips = pageSize * (page - 1);
    const count = await Post.countDocuments({ status: "published" });
    try {
      const posts = await Post.find({ status: "published" })
        .sort({ createdAt: -1 })
        .select("title slug image createdAt description comments views")
        .skip(skips)
        .limit(pageSize);
      res.json({
        posts,
        pageCount: Math.ceil(count / pageSize)
      });
    } catch (e) {
      res.status(500).json(e);
    }
  },
  getRecentPosts: async (req, res) => {
    try {
      const posts = await Post.find({ status: "published" })
        .sort({ createdAt: -1 })
        .select("title slug image")
        .limit(3);
      res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  getPostBySlug: async (req, res) => {
    try {
      const post = await Post.findOne({ slug: req.params.slug }).populate(
        "comments"
      );
      res.json({
        success: true,
        post: post
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  },
  addView: async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const ipExist = await Hit.find({ ip: ip });
    const allPostsWithSameIp = ipExist
      .map(x => x.id)
      .join(",")
      .split(",");
    const uniq = allPostsWithSameIp.includes(req.params.id);
    if (!uniq) {
      const hit = new Hit({
        id: req.params.id,
        ip: ip
      });
      await hit.save();
      const $set = {
        views: ++req.body.views
      };
      try {
        await Post.findOneAndUpdate({ _id: req.params.id }, { $set });
        res.status(204).json();
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.json(req.body.views);
    }
  }
};
