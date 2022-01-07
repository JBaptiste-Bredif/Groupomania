const express = require('express')
const router = express.Router()
const likeCtrl = require('../controllers/controller-like')
// const limit = require('../middleware/limit-connection')
const auth = require('../middleware/auth')

router.post('/:publication_id', auth, likeCtrl.likeOrNot)

module.exports = router