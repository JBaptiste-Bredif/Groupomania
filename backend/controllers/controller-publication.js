const db = require('../models/index.js')

// Il faudra récupérer l'intégralité des publications ( ou voir comment faire pour éviter d'avori à charger trop d'infos )
// Pour chaque publi il faudra récupérer tous les coms liée a la publi + récupérer le nombre de like présent sur la publi
// voir si il faut récup la photo de profil de chaque user sur les coms
// bouton pour voir les commentaires donc appeler la liste des commentaires (controller-comment)
// donc récupérer seulement la liste des postes

// POST : '/api/publication'
exports.addPublication = (req, res, next) => {
  const user = req.user
  db.publication.create({
    user_id: user.id,
    description: req.body.description,
    photo: req.body.photo
  })
    .then((result) => res.status(201).json({ message: 'Publication ajouté !', publication_id: result.id }))
    .catch(error => res.status(500).json({ error }))
}

// PUT : '/api/publication/:publication_id'
exports.updatePublication = (req, res, next) => {
  const user = req.user
  db.publication.findOne({ where: { id: req.params.publication_id } })
    .then(publication => {
      if (!publication) {
        return res.status(404).json({ error: 'Publication introuvable !' })
      }
      if (publication.user_id != user.id) {
        return res.status(401).json({ error: ' Unauthorized !' })
      }
      publication.update({ description: req.body.description })
        .then(() => res.status(200).json({ message: 'Publication mis à jours !' }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}

// DELETE : '/api/publication/:publication_id'
exports.deletePublication = (req, res, next) => {
  const user = req.user
  db.publication.findOne({ where: { id: req.params.publication_id } })
    .then(publication => {
      if (!publication) {
        return res.status(404).json({ error: 'Publication introuvable !' })
      }
      if (!user.admin && publication.user_id != user.id) {
        return res.status(401).json({ error: 'Unauthorized !' })
      }
      publication.destroy()
        .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}