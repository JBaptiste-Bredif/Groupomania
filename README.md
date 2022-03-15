# Groupomania

Bienvenue sur le 7 eme projet de ma formation OpenClassrooms.
Vous pouvez retrouver le projet sur : [![Netlify Status](https://api.netlify.com/api/v1/badges/bad68cec-380b-4499-89b3-28ad66be178d/deploy-status)](https://jb-groupomania.netlify.app/)

![Preview App](https://res.cloudinary.com/dqo9zo8zm/image/upload/v1647291594/Capture_zwdxn7.png)

### Pré-requis

- NodeJS
- Base de données MySQL
- Un compte [Cloudinary](https://cloudinary.com/)

### Installation

- Cloner ce projet depuis GitHub

## Frontend

_Le port 8080 doit être libre_

- Ouvrir un terminal dans le dossier `frontend`
- Modifiez le fichier .env.dev en .env et y mettre votre lien API :

```
VUE_APP_API_BASE_URL=your host/api - Si local ->  http://localhost:3000/api
! Ne pas oublier le /api à la fin !
```

- Puis exécutez la commande : `npm install` pour installer toutes les dépendances du Front
- Une fois les dépendances installées, exécutez la commande : `npm run serve`
- Allez à l'adresse http://localhost:8080

## Backend

_Le port 3000 doit être libre_

- Ouvrir un terminal dans le dossier `backend`
- Modifiez le fichier .env.dev en .env et y mettre vos informations :

```
HOST=your host - Si local -> 127.0.0.1
DB_LOGIN=your username - Si local -> root
DB_PWD=your password - Si local -> vide
DB=your database - Si local -> groupomania
TOKEN_KEY=token
CLOUDINARY_URL=your cloudinary url - Trouvable sur le dashboard Cloudinary
```

- Puis exécutez la commande :`npm install` pour installer toutes les dépendances du Back
- Pour mettre en place la base de données en local : `npx sequelize-cli db:create` puis `npx sequelize-cli db:migrate`
- Sinon rendez-vous dans le fichier config.json présent dans le dossier config et remplissez les informations liées à votre base de données
- Pour terminer exécutez la commande : `npm start`, regardez dans le terminal si la connexion à bien réussi.

## Auteur

- **Jean-Baptiste Brédif**
