const express = require('express')
const router = express.Router()

const job = require('../controller/job.controller')
router.post('/',job.jobData)

module.exports = router