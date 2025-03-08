const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "public")));

const corsOptions = { origins: [process.env.ALLOWED_ORIGIN] };
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.listen(PORT, () => console.log(`Server started on ${PORT} `));
