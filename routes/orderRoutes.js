const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControler");

router.get("/", getOrders);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
