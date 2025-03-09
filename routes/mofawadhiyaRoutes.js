const express = require('express');
const { createMofawadhiya, getAllMofawadhiya } = require('../controllers/mofawadhiyaController');
const router = express.Router();

// Route POST pour ajouter un nouvel Mofawadhiya
router.post('/mofawadhiya', createMofawadhiya);

// Route GET pour afficher tous les Mofawadhiya
router.get('/gmofawadhiya', getAllMofawadhiya);

module.exports = router;
