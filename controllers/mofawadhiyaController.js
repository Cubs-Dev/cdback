const Mofawadhiya = require('../models/mofawadhiya');

// ✅ Création d'un enregistrement avec validation renforcée
const createMofawadhiya = async (req, res) => {
  try {
    const { idsrr, nomrr, prenomrr, numtelrr, adresseemailrr, regionr } = req.body;

    // Vérification des champs obligatoires
    if (!idsrr || !nomrr.trim() || !prenomrr.trim() || !regionr.trim()) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis correctement' });
    }

    const newMofawadhiya = new Mofawadhiya({
      idsrr,
      nomrr,
      prenomrr,
      numtelrr,
      adresseemailrr,
      regionr,
    });

    await newMofawadhiya.save();

    res.status(201).json({
      message: 'Mofawadhiya ajouté avec succès',
      data: newMofawadhiya,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout', error: error.message });
  }
};

// ✅ Récupération de tous les enregistrements
const getAllMofawadhiya = async (req, res) => {
  try {
    const mofawadhiyas = await Mofawadhiya.find();

    if (mofawadhiyas.length === 0) {
      return res.status(200).json({ message: 'Aucun enregistrement trouvé', data: [] });
    }

    res.status(200).json({
      message: 'Liste des Mofawadhiya récupérée avec succès',
      data: mofawadhiyas,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération', error: error.message });
  }
};

module.exports = { createMofawadhiya, getAllMofawadhiya };
