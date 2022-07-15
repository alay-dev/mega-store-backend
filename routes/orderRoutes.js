const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router
  .route("/")
  .get(orderController.getOrder)
  .post(orderController.checkOrder, orderController.placeOrder);

router.route("/:id").get(orderController.getOneOrder);
router.route("/get_all_user_orders/:user_id").get(orderController.getUserOrder);

module.exports = router;
