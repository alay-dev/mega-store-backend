const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is missing"],
    },
    price: {
      type: Number,
      required: [true, "Product price is missing"],
    },
    category: {
      type: String,
      required: [true, "Product category is missing"],
      enum: {
        values: [
          "fruit_and_vegetable",
          "seafood_and_meat",
          "bakery",
          "beverage",
          "foodgrain_and_spice",
          "personalcare_and_cosmetic",
          "household",
          "snack",
        ],
        message: "Wrong category",
      },
    },
    onOffer: {
      type: Boolean,
      default: false,
    },
    dealOfTheDay: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    image: {
      type: String,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
