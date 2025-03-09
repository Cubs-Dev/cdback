// models/Amofawadhiya.js
const mongoose = require('mongoose');

const MofawadhiyaSchema = mongoose.Schema(
  {
    idsrr: { type: Number, required: true },
    nomrr: { type: String, required: true },
    prenomrr: { type: String, required: true },
    numtelrr: { type: String, required: false },
    adresseemailrr: { type: String, required: false },
    regionr: { type: String, required: true },
  },
  { timestamps: true }
);

const Mofawadhiya = mongoose.model('Mofawadhiya', MofawadhiyaSchema);

module.exports = Mofawadhiya;