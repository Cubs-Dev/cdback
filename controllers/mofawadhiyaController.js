const Mofawadhiya = require('../models/mofawadhiya');

// Fonction pour ajouter un nouvel enregistrement
const createMofawadhiya = async (req, res) => {
  const { idsrr, nomrr, prenomrr, numtelrr, adresseemailrr, regionr } = req.body;

  if (!idsrr || !nomrr || !prenomrr || !regionr) {
    return res.status(400).json({ message: 'Champs manquants ou invalides' });
  }

  try {
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
    console.error('Erreur lors de l\'ajout:', error); // Plus d'infos sur l'erreur
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la donnée', error });
  }
};

// Fonction pour afficher tous les enregistrements
const getAllMofawadhiya = async (req, res) => {
  try {
    const mofawadhiyas = await Mofawadhiya.find(); // Récupère tous les enregistrements
    res.status(200).json({
      message: 'Liste des Mofawadhiya récupérée avec succès',
      data: mofawadhiyas,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération:', error); // Plus d'infos sur l'erreur
    res.status(500).json({ message: 'Erreur lors de la récupération des données', error });
  }
};

module.exports = { createMofawadhiya, getAllMofawadhiya };
