const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models/index.js')

// POST : '/api/auth/signup'
exports.signup = async (req, res, next) => {
  db.user.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: "Cette email est déjà utilisé" })
      }
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          db.user.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            admin: false,
          })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// POST : '/api/auth/login'
exports.login = (req, res, next) => {
  db.user.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res.status(200).json({
            message: "Vous êtes connecté ! ",
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              `${process.env.TOKEN_KEY}`
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// DELETE : '/api/auth/:userId'
exports.delete = (req, res, next) => { // La suppression devra aussi se faire sur les commentaires de la personnes, sur ces postes ( donc voir comment gérer les commentaires des autres sur le poste supprimé) et voir pour les likes
  const user = req.user
  bcrypt.compare(req.body.password, user.password)
    .then(valide => {
      if (!valide) {
        return res.status(401).json({ error: "Mot de passe incorrect ! " })
      }
      user.destroy()
        .then(() => res.status(200).json({ message: 'Compte supprimé !' }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))

}

// PUT : '/api/auth/account/:userId'
exports.updateAccount = (req, res, next) => {
  const user = req.user
  if (user.email !== req.body.email) {
    db.user.findOne({ where: { email: req.body.email } })
      .then(result => {
        if (result) {
          return res.status(400).json({ error: "Cette email est déjà utilisé !" })
        }
      })
      .catch(error => res.status(500).json({ error }))
  }
  user.update({ pseudo: req.body.pseudo, email: req.body.email, photo: req.body.photo })
    .then(() => res.status(201).json({ message: 'Informations mises à jours !' }))
    .catch(error => res.status(500).json({ error }))
}

// PUT : '/api/auth/password/:userId'
exports.updatePassword = (req, res, next) => {
  const user = req.user
  console.log("🚀 ~ file: controller-user.js ~ line 91 ~ user.password", req.body.oldPassword)

  bcrypt.compare(req.body.oldPassword, user.password)
    .then(valid => {
      console.log("🚀 ~ file: controller-user.js ~ line 94 ~ valid", valid)
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect ! " })
      }
      bcrypt.hash(req.body.newPassword, 10)
        .then(hash => {
          user.update({ password: hash })
            .then(() => res.status(201).json({ message: 'Informations mises à jours !' }))
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}