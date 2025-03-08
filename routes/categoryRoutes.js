const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
