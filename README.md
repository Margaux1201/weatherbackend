# WeatherApp

WeatherApp est une application web permettant de rechercher, d’ajouter et de consulter la météo de différentes villes, ainsi que de gérer l’inscription et la connexion des utilisateurs.

## Fonctionnalités

- **Recherche et ajout de villes** pour afficher leur météo en temps réel (OpenWeatherMap API)
- **Suppression de villes** de la liste
- **Inscription et connexion** des utilisateurs avec gestion sécurisée des mots de passe
- **Interface utilisateur responsive** et moderne

---

## Architecture du projet

```
weatherbackend/
  app.js
  bin/www
  models/
    cities.js
    users.js
    connection.js
  modules/
    checkBody.js
  routes/
    index.js
    users.js
    weather.js
  public/
    stylesheets/
      style.css
  .env
  package.json
  urls.js
  vercel.json

weatherfrontend/
  index.html
  login.html
  script.js
  login.js
  style.css
  login.css
  images/
    ...
  package.json
```

---

## Démarrage rapide

### 1. Backend

- Installer les dépendances :
  ```sh
  cd weatherbackend
  npm install
  ```
- Configurer le fichier `.env` avec la chaîne de connexion MongoDB et la clé API OpenWeatherMap.
- Lancer le serveur :
  ```sh
  npm start
  ```
- Le backend écoute sur le port **3000** par défaut.

### 2. Frontend

- Ouvrir `index.html` ou `login.html` dans un navigateur.
- Le frontend communique avec le backend via `fetch` sur `http://localhost:3000`.

---

## Fonctionnement

### Backend ([weatherbackend/](weatherbackend/))

- **Express.js** pour le serveur HTTP
- **MongoDB** via Mongoose pour stocker les utilisateurs et les villes
- **Routes principales** :
  - `/users/signup` : inscription utilisateur ([`routes/users.js`](weatherbackend/routes/users.js))
  - `/users/signin` : connexion utilisateur ([`routes/users.js`](weatherbackend/routes/users.js))
  - `/weather` : ajout, récupération, suppression de villes ([`routes/weather.js`](weatherbackend/routes/weather.js))
- **Sécurité** : mots de passe hashés avec bcrypt
- **Connexion à la base** : [`models/connection.js`](weatherbackend/models/connection.js)

### Frontend ([weatherfrontend/](weatherfrontend/))

- **Pages principales** :
  - `index.html` : affichage et gestion des villes
  - `login.html` : inscription et connexion utilisateur
- **Scripts** :
  - [`script.js`](weatherfrontend/script.js) : gestion des villes (ajout, suppression, affichage météo)
  - [`login.js`](weatherfrontend/login.js) : gestion de l’inscription et connexion utilisateur
- **Styles** : [`style.css`](weatherfrontend/style.css), [`login.css`](weatherfrontend/login.css)
- **Images** : icônes météo et interface

---

## Dépendances principales

- Backend : express, mongoose, bcrypt, dotenv, cors, node-fetch
- Frontend : Vanilla JS, HTML, CSS

---

## Déploiement

- Prêt pour déploiement sur Vercel (voir [`vercel.json`](weatherbackend/vercel.json))
- URLs de production à configurer dans [`urls.js`](weatherbackend/urls.js)

---

## Auteur

Projet réalisé par Margaux Courageux.

---

## Licence

Ce projet est sous licence MIT.
