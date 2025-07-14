var express = require("express");
var router = express.Router();

const User = require("../models/users");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");

// Inscription d'utilisateur
router.post("/signup", (req, res) => {
  // Vérification des champs du formulaire d'inscription
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Champs vides ou manquants" });
    return;
  }

  // Vérification du format de l'email
  const patternMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!patternMail.test(req.body.email)) {
    res.json({ result: false, error: "Email invalide" });
    return;
  }

  // Ajout d'un utilisateur dans la base de données
  User.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      // hachage du mot de passe
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      newUser.save().then(() => {
        res.json({ result: true });
      });
    } else {
      res.json({
        result: false,
        error: "L'utilisateur existe déjà, changez d'adresse email",
      });
    }
  });
});

// Connexion d'utilisateur
router.post("/signin", (req, res) => {
  // Vérification des champs du formulaire de connexion
  if (!req.body.email || !req.body.password) {
    res.json({ result: false, error: "Champs vides ou manquants" });
    return;
  }

  // Vérification du format de l'email
  const patternMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!patternMail.test(req.body.email)) {
    res.json({ result: false, error: "Email invalide" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      // Comparaison du mot de passe haché avec le mot de passe fourni
      if (bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: "Mot de passe incorrect" });
      }
    } else {
      res.json({ result: false, error: "Utilisateur non trouvé" });
    }
  });
});

module.exports = router;
