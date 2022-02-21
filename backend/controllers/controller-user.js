const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models/index.js')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
// direction.ENV
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.CLOUD_API_KEY}`,
  api_secret: `${process.env.CLOUD_API_SECRET}`,
});

// POST : '/api/auth/signup'
exports.signup = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user) {
        return res.status(409).json({ error: "Cette email est déjà utilisé" })
      }
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          db.User.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            admin: false,
          })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => { return res.status(500).json({ error: error.message }) })
        })
        .catch(error => { return res.status(500).json({ error: error.message }) })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) })
}

// POST : '/api/auth/login'
exports.login = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email } })
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
            userData: {
              pseudo: user.pseudo,
              email: user.email,
              photoUrl: user.photoUrl,
              photoId: user.photoId,
              userId: user.id,
              admin: user.admin
            },
            token: jwt.sign(
              { userId: user.id },
              `${process.env.TOKEN_KEY}`
            )
          })
        })
        .catch(error => { return res.status(500).json({ error: error.message }) })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) })
}

// DELETE : '/api/auth/:userId'
exports.delete = (req, res, next) => {
  const user = req.user
  bcrypt.compare(req.body.password, user.password)
    .then(valide => {
      if (!valide) {
        return res.status(401).json({ error: "Mot de passe incorrect ! " })
      }
      user.destroy()
        .then(() => res.status(200).json({ message: 'Compte supprimé !' }))
        .catch(error => { return res.status(500).json({ error: error.message }) })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) })
}

// GET : '/api/auth/users'
exports.getAllUsers = (req, res, next) => {
  db.User.findAll({ attributes: ['pseudo', 'email', 'photoUrl', 'photoId', 'admin'] })
    .then(users => {
      res.status(200).json({ users_list: users })
    })
    .catch(error => {
      return res.status(500).json({ error: error.message })
    })
}

// PUT : '/api/auth/account/:userId'
exports.updateAccount = (req, res, next) => {
  const user = req.user
  let data = []
  try {
    data = JSON.parse(req.body.data)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  const previous_photoId = req.user.photoId

  if (user.email !== data.email) {
    db.User.findOne({ where: { email: data.email } })
      .then(result => {
        if (result) {
          return res.status(409).json({ error: "Cette email est déjà utilisé !" })
        }
      })
      .catch(error => {
        return res.status(500).json({ error: error.message })
      })
  }
  // const filename = user.photo.split('/images/')[1]
  if (req.file) {
    const base_url_photo = `./images/${req.file.filename}`
    // File upload (example for promise api)

    cloudinary.uploader.upload(base_url_photo, { tags: 'avatar', folder: 'icon' }, function (error, image) {
      if (error) {
        fs.unlink(base_url_photo, () => {
          return res.status(500).json({ error: error.message })
        })
      }
      // url = image.url 
      // id = image.public_id
      user.update({ pseudo: data.pseudo, email: data.email, photoUrl: image.url, photoId: image.public_id })
        .then(user => {
          cloudinary.uploader.destroy(previous_photoId, { tags: 'avatar', folder: 'icon' }, function (error) {
            if (error) {
              return res.status(500).json({ error: error.message })
            }
            fs.unlink(base_url_photo, () => {
              res.status(201).json({
                message: 'Informations mises à jours !',
                user: {
                  pseudo: user.pseudo,
                  email: user.email,
                  photoUrl: user.photoUrl,
                  photoId: user.photoId
                }
              })
            })
          })
        })
        .catch(error => { return res.status(500).json({ error: error.message }) })
    })
  } else {
    user.update({ pseudo: data.pseudo, email: data.email })
      .then(() => res.status(200).json({
        message: 'Informations mises à jours !',
        user: {
          pseudo: user.pseudo,
          email: user.email,
          photoUrl: user.photoUrl,
          photoId: user.photoId
        }
      }))
      .catch(error => { return res.status(500).json({ error: error.message }) })
  }
}

// PUT : '/api/auth/password/:userId'
exports.updatePassword = (req, res, next) => {
  const user = req.user
  bcrypt.compare(req.body.oldPassword, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect ! " })
      }
      bcrypt.hash(req.body.newPassword, 10)
        .then(hash => {
          user.update({ password: hash })
            .then(() => res.status(201).json({
              message: 'Informations mises à jours !',
              newPassword: req.body.newPassword
            }))
            .catch(error => { return res.status(500).json({ error: error.message }) })
        })
        .catch(error => { return res.status(500).json({ error: error.message }) })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) })
}