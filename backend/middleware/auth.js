const jwt = require('jsonwebtoken')
const db = require('../models/index.js')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`)
    const userId = decodedToken.userId
    if (!req.params.userId || req.params.userId != userId) { // juste prendre le token pour la req 
      res.status(401).json({ error: 'Unauthenticated request !' })
    }
    db.user.findOne({ where: { id: req.params.userId } })
      .then(user => {
        if (!user) {
          res.status(404).send()
        }
        req.user = user
        next()
      })
      .catch(error => { res.status(500).json({ error }) })
  } catch (error) {
    res.status(401).json({ error: 'Unauthenticated request !' })
  }
}