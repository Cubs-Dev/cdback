const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");  // Ensure your MongoDB config is correct

const app = express();

// Load environment variables
if (dotenv.error) {
  console.log("Error loading .env file", dotenv.error);
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Middleware for file uploads
app.use(fileUpload());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || "*",  // Use the ALLOWED_ORIGIN environment variable
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/mofawadhiya", require("./routes/mofawadhiyaRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.green);
});
