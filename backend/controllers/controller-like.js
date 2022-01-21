const db = require('../models/index.js')

// PUT : '/api/auth/account/:userId'
exports.likeOrNot = (req, res, next) => {
  const user = req.user
  db.Publication.findOne({ where: { id: req.params.publicationId } })
    .then((publication) => {
      if (!publication) {
        return res.status(404).json({ error: "Cette publication n'existe plus" })
      }
      db.Like.findOne({ where: { userId: user.id, publicationId: publication.id } })
        .then(result => {
          if (result) { // Like déja en BDD
            result.destroy()
              .then(() => {
                if (publication.countLikes > 0) {
                  publication.decrement('countLikes')
                    .catch(error => { return res.status(500).json({ error: 'Error on decrement !' }) })
                }
                res.status(201).json({ message: 'Like supprimé !' })
              })
              .catch(error => { res.status(500).json({ error }) })
          } else { // cas pas de like en BDD
            db.Like.create({
              userId: user.id,
              publicationId: publication.id,
            })
              .then(() => {
                publication.increment('countLikes')
                  .then(() => res.status(201).json({ message: 'Like Ajouté !' }))
                  .catch(error => res.status(500).json({ error: 'Error on increment' }))
              })
              .catch(error => res.status(500).json({ error: "Error on create Like" }))
          }
        })
    })
    .catch(error => res.status(500).json({ error }))
}