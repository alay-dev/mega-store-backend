const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./factoryController");
const Review = require("../models/reviewModel");

exports.getReview = factory.getOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getAllReview = factory.getAll(Review);

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
