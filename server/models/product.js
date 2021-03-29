const { Schema, model } = require('mongoose');
const ProductSchema = new Schema({
  title: {
    type: String,
  },
  category: {
    type: Array,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Boolean,
  },
  discountPrice: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: Array,
  },
  info: {
    type: Array,
  },
  slug: { type: String, unique: true, sparse: true },
});

module.exports = model('Product', ProductSchema);
