const db = require('../models/index.js')

// PUT : '/api/auth/account/:userId'
exports.likeOrNot = (req, res, next) => {
  const user = req.user
  db.Like.findOne({ where: { userId: user.id, publicationId: req.params.publicationId } })
    .then(result => {
      if (result) {
        result.destroy()
          .then(() => { res.status(201).json({ message: 'Like supprimé !' }) })
          .catch(error => { res.status(500).json({ error }) })
      } else {
        db.Publication.findOne({ where: { id: req.params.publicationId } })
          .then((publication) => {
            if (!publication) {
              return res.status(404).json({ error: "Cette publication n'existe plus" })
            }
            db.Like.create({
              userId: user.id,
              publicationId: req.params.publicationId
            })
              .then(() => res.status(201).json({ message: 'Like Ajouté !' }))
              .catch(error => res.status(400).json({ error }))
          }).catch((err) => {
            res.status(500).json({ error })
          });
      }
    })
    .catch(error => res.status(500).json({ error }))
}