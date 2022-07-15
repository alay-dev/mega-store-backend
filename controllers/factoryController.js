const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No Document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No Document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("create one", req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("hello");
    let doc;
    // if (Model === "Product") {
    //   doc = await Model.findById(req.params.id).populate();
    // } else {
    //   doc = await Model.findById(req.params.id);
    // }

    console.log(req.params.id);

    doc = await Model.findById(req.params.id);
    console.log(doc);

    // if (popOptions) query = query.populate(popOptions);

    if (!doc) {
      return next(new AppError("No Document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
