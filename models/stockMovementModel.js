const mongoose = require("mongoose");

const stockMovementSchema = mongoose.Schema(
  {
    sens: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
    typeOperation: {
      type: String,
      default:"Achat",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("StockMovement", stockMovementSchema);
