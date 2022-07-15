const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Order = require("../models/orderModel");
const factory = require("./factoryController");
const Product = require("../models/productModel");
const OrderItem = require("../models/orderItemModel");
const mongoose = require("mongoose");

exports.checkOrder = catchAsync(async (req, res, next) => {
  const { orderItem } = req.body;
  let totalCost = 0;
  let totalDiscount = 0;

  const itemId = orderItem.map((item) => item.item);
  const itemFromDb = await Product.find({ _id: { $in: itemId } });

  itemFromDb.map((item, i) => {
    let tmp3 = (item.discount / 100) * item.price;
    totalDiscount = totalDiscount + tmp3 * orderItem[i].quantity;
    totalCost = totalCost + item.price * orderItem[i].quantity;
  });

  totalDiscount = Math.floor(totalDiscount);

  totalCost = totalCost - totalDiscount + 10;
  req.body = { ...req.body, totalPrice: totalCost };

  next();
});

exports.placeOrder = catchAsync(async (req, res, next) => {
  const orderItems = await OrderItem.insertMany(req.body.orderItem);

  if (!orderItems) {
    return next(new AppError("Something went wrong", 500));
  }

  console.log(orderItems, ">>>>>>");

  req.body.allItemId = orderItems.map((item) => item._id);

  const orderDoc = await Order.create(req.body);
  if (!orderDoc) {
    return next(new AppError("Something went wrong", 500));
  }

  res.status(200).json({
    status: "success",
    data: orderDoc,
  });
});

exports.getOrder = factory.getAll(Order);

exports.getOneOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "allItemId",
    populate: [{ path: "item" }],
  });

  if (!order) {
    return next(new AppError("No Document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.getUserOrder = catchAsync(async (req, res, next) => {
  const user_id = req.params.user_id;

  const orders = await Order.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(user_id),
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: orders,
  });
});
