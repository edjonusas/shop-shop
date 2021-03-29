const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hitSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "Post" },
  ip: { type: String }
});

module.exports = mongoose.model("Hit", hitSchema);
