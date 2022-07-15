const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Wishlist = require("../models/wishlistModel");

exports.getWishlist = catchAsync(async (req, res, next) => {
  const userId = req.params.user_id;

  let wishlist = await Wishlist.findOne({ userId }).populate({
    path: "items",
    model: "Product",
  });

  if (!wishlist) {
    console.log("if check");
    req.body.userId = `${userId}`;
    req.body.items = [];

    wishlist = await Wishlist.create(req.body);
  }
  res.status(200).json({
    status: "success",
    data: wishlist,
  });
});

exports.addToWishlist = catchAsync(async (req, res, next) => {
  const userId = req.body.user_id;
  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    req.body.userId = `${userId}`;
    req.body.items = [`${req.body.product_id}`];
    wishlist = await Wishlist.create(req.body);
  } else {
    if (wishlist.items.indexOf(req.body.product_id) === -1) {
      wishlist.items.push(req.body.product_id);
      wishlist = await wishlist.save();
    }
  }
  res.status(200).json({
    status: "success",
    data: wishlist,
  });
});

exports.removeFromWishlist = catchAsync(async (req, res, next) => {
  const userId = req.body.user_id;

  let wishlist = await Wishlist.findOne({ userId });
  // console.log(userId);
  // console.log(wishlist);
  // console.log(req.body.product_id);

  if (wishlist) {
    wishlist.items = wishlist.items.filter(
      (item) => item.toString() !== req.body.product_id.toString()
    );
    // console.log(wishlist.items);

    wishlist = await wishlist.save();
  }
  res.status(200).json({
    status: "success",
    data: wishlist,
  });
});
