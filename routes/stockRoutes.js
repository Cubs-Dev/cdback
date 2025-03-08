const express = require("express");
const router = express.Router();
const { getStockMovements } = require("../controllers/stockController");

router.get("/", getStockMovements);

module.exports = router;
