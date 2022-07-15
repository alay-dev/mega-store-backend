const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/:user_id").get(wishlistController.getWishlist);

router
  .route("/add_to_wishlist")
  .patch(authController.protect, wishlistController.addToWishlist);

router
  .route("/remove_from_wishlist")
  .patch(wishlistController.removeFromWishlist);

module.exports = router;
