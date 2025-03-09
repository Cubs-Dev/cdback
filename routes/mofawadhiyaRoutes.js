const express = require('express');
const { createMofawadhiya, getAllMofawadhiya } = require('../controllers/mofawadhiyaController');

const router = express.Router();

// ✅ Route pour ajouter un nouvel enregistrement
router.post('/mofawadhiya', createMofawadhiya);

// ✅ Route pour récupérer tous les enregistrements
router.get('/mofawadhiya', getAllMofawadhiya);

module.exports = router;
