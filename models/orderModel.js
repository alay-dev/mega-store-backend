const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: [true, "TotalPrice is missing"],
    },
    orderDate: {
      type: Date,
      required: [true, "Order date is missing"],
      default: Date.now(),
    },
    allItemId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "OrderItem",
      },
    ],
    shippingAddress: {
      type: String,
      required: [true, "Shipping address is missing"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is missing"],
      enum: {
        values: ["upi", "paypal", "cod"],
        message: "Wrong payment method",
      },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidOn: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredDate: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
