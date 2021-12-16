const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/controller-user')
const limit = require('../middleware/limit-connection')
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup)
router.post('/login', limit.connection(5), userCtrl.login)
router.delete('/:userId', limit.connection(3), auth, userCtrl.delete)
router.put('/account/:userId', auth, userCtrl.updateAccount)
router.put('/password/:userId', auth, userCtrl.updatePassword)

module.exports = router