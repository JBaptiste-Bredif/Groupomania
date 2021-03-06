const db = require('../models/index.js')
const fs = require('fs')
const cloudinary = require('cloudinary').v2

// GET : '/api/publication/:publicationId'
exports.getAllPublications = (req, res, next) => {
  const user = req.user
  db.Publication.findAll({
    include: [
      {
        model: db.User,
        required: true,
        attributes: ["pseudo", "photoUrl", "photoId"]
      },
      {
        model: db.Like,
        attributes: ["userId"],
      },
    ]
    ,
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(publications => {
      if (!publications) {
        return res.status(404).json({ error: 'Aucune publication trouvées !' })
      }
      res.status(200).json({ publications })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) })
}

// POST : '/api/publication'
exports.addPublication = (req, res, next) => {
  const user = req.user
  let data = []
  try {
    data = JSON.parse(req.body.data)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  if (req.file) {
    const base_url_photo = `./images/${req.file.filename}`
    // File upload (example for promise api)
    cloudinary.uploader.upload(base_url_photo, { tags: 'content', folder: 'publication' }, function (error, image) {

      if (error) {
        fs.unlink(base_url_photo, () => {
          return res.status(500).json({ error: error.message })
        })
      }
      fs.unlink(base_url_photo, () => {
        db.Publication.create({
          userId: user.id,
          description: data.description,
          photoUrl: image.url,
          photoId: image.public_id,
        })
          .then((result) => {
            res.status(201).json({
              message: 'Publication ajouté !',
              publication: {
                Likes: [],
                User: {
                  photoUrl: user.photoUrl,
                  pseudo: user.pseudo
                },
                // dataValues est l'object où se trouve toute les valeurs récupérées de la BDD
                ...result.dataValues
              }
            })
          })
          .catch(error => { return res.status(500).json({ error: error.message }) })
      })
    })
  } else {
    db.Publication.create({
      userId: user.id,
      description: data.description
    })
      .then((result) => res.status(201).json({
        message: 'Publication ajouté !',
        publication: {
          Likes: [],
          User: {
            photoUrl: user.photoUrl,
            pseudo: user.pseudo
          },
          // dataValues est l'object où se trouve toute les valeurs récupérées de la BDD
          ...result.dataValues
        }
      }))
      .catch(error => { return res.status(500).json({ error: error.message }) })
  }

}

// PUT : '/api/publication/:publicationId'
exports.updatePublication = (req, res, next) => {
  const user = req.user
  db.Publication.findOne({ where: { id: req.params.publicationId } })
    .then(publication => {
      if (!publication) {
        return res.status(404).json({ error: 'Publication introuvable !' })
      }
      if (publication.userId != user.id) {
        return res.status(401).json({ error: ' Unauthorized !' })
      }
      publication.update({ description: req.body.description })
        .then(() => res.status(200).json({ message: 'Publication mis à jour !' }))
        .catch(error => { return res.status(500).json({ error: error.message }) })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) });
}

// DELETE : '/api/publication/:publicationId'
exports.deletePublication = (req, res, next) => {
  const user = req.user
  db.Publication.findOne({ where: { id: req.params.publicationId } })
    .then(publication => {
      if (!publication) {
        return res.status(404).json({ error: 'Publication introuvable !' })
      }
      if (!user.admin && publication.userId != user.id) {
        return res.status(401).json({ error: 'Unauthorized !' })
      }
      if (publication.photoId) {
        cloudinary.uploader.destroy(publication.photoId, { tags: 'content', folder: 'publication' }, function (error) {
          if (error) {
            return res.status(500).json({ error: error.message })
          }
        })
      }
      publication.destroy()
        .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
        .catch(error => { return res.status(500).json({ error: error.message }) })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) });
}