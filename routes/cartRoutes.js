const express = require("express");
const cartController = require("../controllers/cartController");
const factoryController = require("../controllers/factoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/:id")
  .get(cartController.getCart)
  .delete(cartController.deleteCart);

router
  .route("/add_to_cart")
  .patch(authController.protect, cartController.addToCart);
router
  .route("/increase_quantity")
  .patch(authController.protect, cartController.increaseQuantity);
router
  .route("/decrease_quantity")
  .patch(authController.protect, cartController.decreaseQuantity);

router
  .route("/remove_from_cart")
  .patch(authController.protect, cartController.removeFromCart);

module.exports = router;
