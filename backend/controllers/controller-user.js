const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models/index.js')

// '/api/auth/signup'
exports.signup = async (req, res, next) => {
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    console.log('coucou')
    if (user) {
      return res.status(400).send({ error: "Cette email est déjà utilisé" });
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
  } catch (err) {
    return res.status(500).json({ error: err })
  }

  // db.User.findOne({ where: { email: req.body.email } })
  //   .then((user) => {
  //     if (user) {
  //       return res.status(400).send({ error: "Cette email est déjà utilisé" });
  //     }
  //     bcrypt.hash(req.body.password, 10)
  //       .then(hash => {
  //         db.User.create({
  //           pseudo: req.body.pseudo,
  //           email: req.body.email,
  //           password: hash,
  //           admin: false,
  //         })
  //           .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
  //           .catch(error => res.status(400).json({ error }))
  //       })
  //       .catch(error => res.status(500).json({ error }))
  //   })
  //   .catch(error => res.status(500).json({ error: " hello " }))
}

// '/api/auth/login'
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