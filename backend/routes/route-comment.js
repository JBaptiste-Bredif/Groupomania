const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/controller-comment')
// const limit = require('../middleware/limit-connection')
const auth = require('../middleware/auth')

router.post('/:publication_id', auth, commentCtrl.addComment)
router.put('/:comment_id', auth, commentCtrl.updateComment)
router.delete('/:comment_id', auth, commentCtrl.deleteComment)

module.exports = router