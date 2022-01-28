const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/controller-user')
const limit = require('../middleware/limit-connection')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.post('/signup', userCtrl.signup)
router.post('/login', limit.connection(5), userCtrl.login)
router.delete('/', limit.connection(3), auth, userCtrl.delete)
router.put('/account', auth, multer, userCtrl.updateAccount)
router.put('/password', auth, userCtrl.updatePassword)

module.exports = router