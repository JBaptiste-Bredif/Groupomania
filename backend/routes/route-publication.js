const express = require('express')
const router = express.Router()
const publicationCtrl = require('../controllers/controller-publication')
// const limit = require('../middleware/limit-connection')
const auth = require('../middleware/auth')

router.post('/', auth, publicationCtrl.addPublication)
router.put('/:publication_id', auth, publicationCtrl.updatePublication)
router.delete('/:publication_id', auth, publicationCtrl.deletePublication)

module.exports = router