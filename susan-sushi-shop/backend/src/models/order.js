const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  total_price: Number,
  discount_applied: Number,
  final_price: Number,
  items: [
    {
      sushi_type: String,
      quantity: Number,
      price_per_unit: Number
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
