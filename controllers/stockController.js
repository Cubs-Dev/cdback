const asyncHandler = require("express-async-handler");
const StockMovement = require("../models/stockMovementModel");

const getStockMovements = asyncHandler(async (req, res) => {
  const stockMovements = await StockMovement.find()
    .sort({ createdAt: -1 })
    .populate("createdBy")
    .populate("productId");
  res.status(200).json({ stockMovements });
});

module.exports = { getStockMovements };
