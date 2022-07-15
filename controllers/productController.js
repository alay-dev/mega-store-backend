const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./factoryController");
const Product = require("../models/productModel");
const multer = require("multer");

exports.getProduct = factory.getOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.getAllProduct = factory.getAll(Product);

exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.getProductByCategory = catchAsync(async (req, res, next) => {
  const category = req.params.category;

  const products = await Product.aggregate([
    {
      $match: { category: category },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

exports.getDealOfTheDay = catchAsync(async (req, res, next) => {
  const products = await Product.aggregate([
    {
      $match: { dealOfTheDay: true },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

exports.getTopSeller = catchAsync(async (req, res, next) => {
  const products = await Product.aggregate([
    {
      $sort: { soldCount: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});
