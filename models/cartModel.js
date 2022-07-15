const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User id is missing"],
    },
    items: [
      {
        productId: String,
        productName: String,
        productImage: String,
        productPrice: Number,
        productDiscount: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
