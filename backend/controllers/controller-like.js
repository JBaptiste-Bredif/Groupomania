const db = require('../models/index.js')

// PUT : '/api/auth/account/:userId'
exports.likeOrNot = (req, res, next) => {
  const user = req.user
  db.like.findOne({ where: { user_id: user.id, publication_id: req.params.publication_id } })
    .then(result => {
      if (result) {
        result.destroy()
          .then(() => { res.status(201).json({ message: 'Like supprimé !' }) })
          .catch(error => { res.status(500).json({ error }) })
      } else {
        db.publication.findOne({ where: { id: req.params.publication_id } })
          .then((publication) => {
            if (!publication) {
              return res.status(404).json({ error: "Cette publication n'existe plus" })
            }
            db.like.create({
              user_id: user.id,
              publication_id: req.params.publication_id
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