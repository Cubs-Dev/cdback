const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "veuillez inserer le champ nom"],
    },
    email: {
      type: String,
      required: ["true", "veuillez inserer le champ email"],
      unique: true,
    },
    password: {
      type: String,
      required: ["true", "veuillez inserer le champ password"],
    },
    adresse: {
      type: String,
    },
    phone: {
      type: String,
    },
    imgUrl: {
      type: String,
      default: "uploads/defaultUser.jpg",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
