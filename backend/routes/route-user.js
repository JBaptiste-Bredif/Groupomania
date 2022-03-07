const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/controller-user')
const limit = require('../middleware/limit-connection')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.post('/signup', userCtrl.signup)
router.post('/login', limit.connection(10), userCtrl.login)
router.post('/relog', limit.connection(100), auth, userCtrl.relog)
router.delete('/', limit.connection(3), auth, userCtrl.delete)
router.put('/account', auth, userCtrl.updateAccount)
router.put('/avatar', auth, multer, userCtrl.updateAvatar)
router.put('/password', auth, userCtrl.updatePassword)
router.get('/users', auth, userCtrl.getAllUsers)

module.exports = router