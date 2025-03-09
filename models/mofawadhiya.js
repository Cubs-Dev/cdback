const mongoose = require('mongoose');

const MofawadhiyaSchema = mongoose.Schema(
  {
    idsrr: { type: String, required: true },
    nomrr: { type: String, required: true, trim: true },
    prenomrr: { type: String, required: true, trim: true },
    numtelrr: {
      type: String,
      validate: {
        validator: function (v) {
          // Validation pour un numéro de téléphone avec ou sans indicatif pays, de 6 à 15 chiffres
          return /^(\+?\d{1,3}[- ]?)?\d{6,15}$/.test(v);
        },
        message: (props) => `${props.value} n'est pas un numéro valide !`,
      },
    },
    adresseemailrr: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} n'est pas un email valide !`,
      },
    },
    regionr: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Mofawadhiya = mongoose.model('Mofawadhiya', MofawadhiyaSchema);

module.exports = Mofawadhiya;
