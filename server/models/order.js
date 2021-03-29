const { Schema, model } = require('mongoose');
const ProductSchema = new Schema({
  shippingInfo: {
    type: Object,
  },
  userRegistered: {
    type: Boolean
  },
  user: {
    type: Object,
  },
  products: {
    type: Array,
  },
  totalAmount: {
    type: Number,
  },
  paypal: {
    type: Object,
  }
});

module.exports = model('Order', ProductSchema);
