const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/controller-comment')
// const limit = require('../middleware/limit-connection')
const auth = require('../middleware/auth')

router.get('/:publicationId', auth, commentCtrl.getAllComments)
router.post('/:publicationId', auth, commentCtrl.addComment)
router.put('/:commentId', auth, commentCtrl.updateComment)
router.delete('/:commentId', auth, commentCtrl.deleteComment)

module.exports = router