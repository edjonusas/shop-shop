const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  slug: { type: String, unique: true },
  title: { type: String, maxlength: 96 },
  description: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "published"],
    default: "active"
  },
  views: {
    type: Number,
    default: 0
  },
  image: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = model("Post", PostSchema);
