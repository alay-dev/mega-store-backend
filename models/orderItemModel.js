const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: { type: Number, required: true, default: 1 },
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItem;
