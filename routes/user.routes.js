const express = require('express')
const router = express.Router()
const user = require('../controller/signUp.controller')

router.get('/', user.getAccounts)
router.post('/delete', user.delProfile)

module.exports = router