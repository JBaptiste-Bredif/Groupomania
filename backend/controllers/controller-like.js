const db = require('../models/index.js')

// POST : '/api/like/:publicationId'
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
                    .catch(error => { return res.status(500).json({ error: error.message }) })
                }
                res.status(201).json({ message: 'Like supprimé !', like: false })
              })
              .catch(error => { return res.status(500).json({ error: error.message }) })
          } else { // cas pas de like en BDD
            db.Like.create({
              userId: user.id,
              publicationId: publication.id,
            })
              .then(() => {
                publication.increment('countLikes')
                  .then(() => res.status(201).json({ message: 'Like Ajouté !', like: true }))
                  .catch(error => { return res.status(500).json({ error: error.message }) })
              })
              .catch(error => { return res.status(500).json({ error: error.message }) })
          }
        })
    })
    .catch(error => { return res.status(500).json({ error: error.message }) })
}