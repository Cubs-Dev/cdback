const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json({ categories });
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({ category });
});

const products = asyncHandler(async (req, res) => {
    await Product.find({ category: req.params.id });
    res.status(200).json({ products });
})

const createCategory = asyncHandler(async (req, res) => {
  const file = req.files.file;
  const fileName = new Date().getTime() + "_" + file.name;
  const imageUrl = "uploads/" + fileName;

  file.mv(uploadPath + fileName, function (err) {
    if (err) return res.status(500).send(err);
  });

  const category = await Category.create({
    name : req.body.name,
    imgUrl: imageUrl,
  });
  res.status(201).json({ category });

});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req .params.id, req.body, { new: true });
  res.status(200).json({ category });
}
);

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ category });
});


module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};