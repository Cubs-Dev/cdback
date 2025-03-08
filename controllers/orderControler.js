const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const StockMovement = require("../models/stockMovementModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcryptjs");

const uploadPath = path.join(__dirname, "..", "public/uploads/");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("orderLines.product").sort({ createdAt: -1 });
  res.json({ orders });
});

const createOrder = asyncHandler(async (req, res) => {
  const { userId, cart } = req.body;

  console.log("Received cart:", cart); // Log the cart to debug

  const user = await User.findById(userId);
  let cartObj;

  try {
    cartObj = JSON.parse(cart);
  } catch (error) {
    return res.status(400).json({ message: "Invalid cart format" });
  }

  if (user && Object.keys(user).length > 0) {
    const fraisPort = 8;
    let totalHT = 0;
    let orderLines = [];

    for (let i = 0; i < cartObj.length; i++) {
      // check stock for each product
      let orderLine = {
        product: cartObj[i]._id,
        quantity: cartObj[i].quantity,
        price: cartObj[i].prix,
      };

      const product = await Product.findById(cartObj[i]._id);
      product.stock -= cartObj[i].quantity;
      product.save();
      StockMovement.create({
        sens: "out",
        quantity: cartObj[i].quantity,
        productId: cartObj[i]._id,
        createdBy: userId,
        comment: "order",
      });

      orderLines.push(orderLine);
      totalHT += cartObj[i].prix * cartObj[i].quantity;
    }

    const order = new Order({
      user: userId,
      orderLines,
      shippingAddress: user.address,
      paymentMethod: "card",
      taxPrice: totalHT * 0.2,
      shippingPrice: fraisPort,
      totalPrice: totalHT + fraisPort + totalHT * 0.2,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { name, email, phone, adresse, imgUrl, userId } = req.body;
  const { id } = req.params;
  let imageUrl = imgUrl;

  if (req.files) {
    const file = req.files.file;
    const fileName = new Date().getTime() + "_" + file.name;
    imageUrl = "uploads/" + fileName;

    file.mv(uploadPath + fileName, function (err) {
      if (err) return res.status(500).send(err);
    });
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      adresse,
      imgUrl: imageUrl,
    },
    { new: true }
  );

  res.status(200).json({ user });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ user, message: "deletion with success" });
});

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};