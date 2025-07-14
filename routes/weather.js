var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const City = require("../models/cities");

const OWM_API_KEY = process.env.OWM_API_KEY;

// Ajout d'une ville dans la base de données
router.post("/", (req, res) => {
  // Vérifie si le nom de la ville n'est pas déjà ajouté dans la base de données
  City.findOne({
    // Recherche insensible à la casse pour le nom de la ville
    cityName: { $regex: new RegExp(req.body.cityName, "i") },
  }).then((dbData) => {
    if (dbData === null) {
      // Requête OpenWeatherMap API pour les données météo
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&appid=${OWM_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((apiData) => {
          console.log("DONNES POST WEATHER =>", apiData);

          // Création d'une nouvelle ville avec les données météos
          const newCity = new City({
            cityName: req.body.cityName,
            main: apiData.weather[0].main,
            description: apiData.weather[0].description,
            tempMin: apiData.main.temp_min,
            tempMax: apiData.main.temp_max,
          });
          // Sauvegarde de la nouvelle ville dans la base de données
          newCity.save().then((newDoc) => {
            res.json({ result: true, weather: newDoc });
          });
        })
        .catch((error) => {
          res.json({
            result: false,
            error:
              "Ville inconnue ou introuvable, retentez avec une autre ville",
          });
        });
    } else {
      // Si la ville est déjà enregistrée, renvoie un message d'erreur
      res.json({ result: false, error: "Ville déjà enregistrée" });
    }
  });
});

// Récupération de toutes les villes enregistrées dans la base de données
router.get("/", (req, res) => {
  City.find().then((data) => {
    res.json({ weather: data });
  });
});

// Récupération des données météo d'une ville spécifique
router.get("/:cityName", (req, res) => {
  City.findOne({
    // Recherche insensible à la casse pour le nom de la ville
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then((data) => {
    if (data) {
      res.json({ result: true, weather: data });
    } else {
      res.json({ result: false, error: "Ville inconnue ou introuvable" });
    }
  });
});

// Supression d"une ville sélectionnée de la base de données
router.delete("/:cityName", (req, res) => {
  City.deleteOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      // document supprimé avec succès
      City.find().then((data) => {
        res.json({ result: true, weather: data });
      });
    } else {
      res.json({ result: false, error: "Ville introuvable" });
    }
  });
});

module.exports = router;
