const express = require('express');
const router = express.Router();

const user = require('../controller/signUp.controller')

router.post('/edit', user.profile)


module.exports = router;