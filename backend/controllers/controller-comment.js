const db = require('../models/index.js')

// POST : '/api/comment/:publication_id'
exports.addComment = (req, res, next) => {
  const user = req.user
  db.publication.findOne({ where: { id: req.params.publication_id } })
    .then(publication => {
      if (!publication) {
        return res.status(404).json({ error: 'Publciation introuvable !' })
      }
      db.comment.create({
        user_id: user.id,
        publication_id: req.params.publication_id,
        message: req.body.message
      })
        .then((result) => res.status(201).json({ message: 'Commentaire ajouté !', comment_id: result.id }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}

// PUT : '/api/comment/:comment_id'
exports.updateComment = (req, res, next) => {
  const user = req.user
  db.comment.findOne({ where: { id: req.params.comment_id } })
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ error: 'Commentaire introuvable !' })
      }
      if (comment.user_id != user.id) {
        return res.status(401).json({ error: ' Unauthorized !' })
      }
      comment.update({ message: req.body.message })
        .then(() => res.status(200).json({ message: 'Commentaire mis à jours !' }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}

// DELETE : '/api/comment/:comment_id'
exports.deleteComment = (req, res, next) => {
  const user = req.user
  db.comment.findOne({ where: { id: req.params.comment_id } })
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ error: 'Commentaire introuvable !' })
      }
      if (!user.admin && comment.user_id != user.id) {
        return res.status(401).json({ error: ' Unauthorized !' })
      }
      comment.destroy()
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}