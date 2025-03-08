const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    designation: {
      type: String,
      required: ["true", "veuillez inserer le champ designation"],
    },
    description: {
      type: String,
      required: ["true", "veuillez inserer le champ description"],
    },
    prix: {
      type: Number,
      required: ["true", "veuillez inserer le champ prix"],
    },
    stockQuantity: {
      type: Number,
      required: ["true", "veuillez inserer le champ stockQuantity"],
    },
    imgUrl: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
