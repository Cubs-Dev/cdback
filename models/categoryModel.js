const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'veuillez inserer le champ name']
    },
    img: {
        type: String,
    }
}, {
    timestamps: true
});

const category = mongoose.model('category', categoryModel);

module.exports = category;