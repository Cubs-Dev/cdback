const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const Product = require("../models/productModel");
const StockMovement = require("../models/stockMovementModel");

const uploadPath = path.join(__dirname, "..", "public/uploads/");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, products });
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  res.status(200).json({ success: true, product });
});

const createProduct = asyncHandler(async (req, res) => {
  if (!req.files || !req.files.file) {
    res.status(400).json({ success: false, message: "No file uploaded" });
    return;
  }

  const file = req.files.file;
  const fileName = new Date().getTime() + "_" + file.name;
  const imageUrl = "uploads/" + fileName;

  try {
    await file.mv(uploadPath + fileName);

    const product = await Product.create({
      designation: req.body.designation,
      description: req.body.description,
      prix: req.body.prix,
      stockQuantity: req.body.stockQuantity,
      imgUrl: imageUrl,
      category: req.body.category,
    });

    const stockMovement = await StockMovement.create({
      sens: "in",
      quantity: product.stockQuantity,
      productId: product._id,
      createdBy: req.body.userId,
      comment: "Nouvelle Alimentation de Stock",
    });

    res.status(201).json({ success: true, product, stockMovement });
  } catch (err) {
    res.status(500).json({ success: false, message: "File upload failed", error: err.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  const previousQuantity = product.stockQuantity;
  const delta = req.body.stockQuantity - previousQuantity;

  const updatedFields = {
    designation: req.body.designation,
    description: req.body.description,
    prix: req.body.prix,
    stockQuantity: req.body.stockQuantity,
    imgUrl: req.body.imageUrl || product.imgUrl, // Retain old image if not updated
  };

  const productModified = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

  const stockMovement = await StockMovement.create({
    sens: delta > 0 ? "in" : "out",
    quantity: Math.abs(delta),
    productId: product._id,
    createdBy: req.body.userId,
    comment: req.body.comment || "Stock updated",
    typeOperation: req.body.typeOperation,
  });

  res.status(200).json({ success: true, product: productModified, stockMovement });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  // Delete associated image file
  const imagePath = path.join(__dirname, "..", product.imgUrl);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await product.remove();
  res.status(200).json({ success: true, message: "Product deleted successfully" });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
