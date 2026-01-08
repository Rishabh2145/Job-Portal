const express = require('express');
const router = express.Router();

const verify = require('../controller/verify.controller')
const forgot = require('../controller/forgot.controller')
const reset = require('../controller/reset.controller')

router.post('/verify', verify.verifyToken)
router.post('/forgot', forgot.forgotControl)
router.post('/reset',reset.resetHandle)
router.post('/check', verify.checkVerification)

module.exports = router;