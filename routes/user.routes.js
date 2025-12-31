const express = require('express')
const router = express.Router()
const user = require('../controller/signUp.controller')
const users = require('../controller/user.controller')

router.get('/', user.getAccounts)
router.get('/profile', users.getUser)
router.post('/delete', user.delProfile)

module.exports = router