const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");  // Assurez-vous que votre configuration MongoDB est correcte

const app = express();

// Charger les variables d'environnement
if (dotenv.error) {
  console.log("Erreur lors du chargement du fichier .env", dotenv.error);
  process.exit(1);
}

// Connexion à MongoDB
connectDB();

// Middleware pour les uploads de fichiers
app.use(fileUpload());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Configuration CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Si ALLOWED_ORIGIN est défini sur "*" alors autoriser toutes les origines
    if (process.env.ALLOWED_ORIGIN === "*" || origin === process.env.ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error("CORS non autorisé pour cette origine"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],  // Méthodes HTTP autorisées
  allowedHeaders: ["Content-Type", "Authorization"],  // En-têtes autorisés
  credentials: true,  // Autoriser les cookies/identifiants
};

app.use(cors(corsOptions));

// Middleware pour analyser les corps de requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/mofawadhiya", require("./routes/mofawadhiyaRoutes"));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`.green);
});
