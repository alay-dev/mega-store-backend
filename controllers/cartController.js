const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const factoryController = require("../controllers/factoryController");

exports.getCart = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    req.body.userId = `${userId}`;
    req.body.items = [];

    cart = await Cart.create(req.body);
  }
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;

  let cart = await Cart.findOne({ userId });
  const product = await Product.findById(req.body.item);

  if (cart) {
    // Cart for user exists

    let itemIndex = -1;

    cart.items.map((row, i) => {
      if (row.productId === req.body.item) {
        itemIndex = i;
      }
    });

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = cart.items[itemIndex].quantity + 1;
    } else {
      const item = {
        productId: product._id,
        productName: product.name,
        productImage: product.image,
        productPrice: product.price,
        productDiscount: product.discount,
      };
      cart.items.push(item);
    }
    cart = await cart.save();
  } else {
    cart = await Cart.create(req.body);
  }

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.increaseQuantity = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;

  let cart = await Cart.findOne({ userId });
  const product = await Product.findById(req.body.item);

  let itemIndex = -1;

  cart.items.map((row, i) => {
    if (row.productId === req.body.item) {
      itemIndex = i;
    }
  });

  cart.items[itemIndex].quantity = cart.items[itemIndex].quantity + 1;
  cart = await cart.save();

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.decreaseQuantity = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;

  let cart = await Cart.findOne({ userId });
  const product = await Product.findById(req.body.item);

  let itemIndex = -1;

  cart.items.map((row, i) => {
    if (row.productId === req.body.item) {
      itemIndex = i;
    }
  });

  if (cart.items[itemIndex].quantity === 1) {
    cart.items = cart.items.filter((item) => item.productId !== req.body.item);
  } else {
    cart.items[itemIndex].quantity = cart.items[itemIndex].quantity - 1;
  }
  cart = await cart.save();

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.deleteCart = factoryController.deleteOne(Cart);

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;

  let cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter((item) => item.productId !== req.body.item);

  cart = await cart.save();

  res.status(200).json({
    status: "success",
    data: cart,
  });
});
