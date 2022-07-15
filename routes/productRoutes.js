const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.route("/deal_of_the_day").get(productController.getDealOfTheDay);
router.route("/top_seller").get(productController.getTopSeller);
router.route("/category/:category").get(productController.getProductByCategory);

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
