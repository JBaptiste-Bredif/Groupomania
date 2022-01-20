const db = require('../models/index.js')

// POST : '/api/comment/:publicationId'
exports.addComment = (req, res, next) => {
  const user = req.user
  db.Publication.findOne({ where: { id: req.params.publicationId } })
    .then(publication => {
      if (!publication) {
        return res.status(404).json({ error: 'Publciation introuvable !' })
      }
      db.Comment.create({
        userId: user.id,
        publicationId: req.params.publicationId,
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
  db.Comment.findOne({ where: { id: req.params.comment_id } })
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ error: 'Commentaire introuvable !' })
      }
      if (comment.userId != user.id) {
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
  db.Comment.findOne({ where: { id: req.params.comment_id } })
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ error: 'Commentaire introuvable !' })
      }
      if (!user.admin && comment.userId != user.id) {
        return res.status(401).json({ error: ' Unauthorized !' })
      }
      comment.destroy()
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}