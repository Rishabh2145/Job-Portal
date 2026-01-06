const express = require('express');
const router = express.Router();

const user = require('../controller/signUp.controller')
const job = require('../controller/job.controller')

router.post('/edit', user.profile)
router.post('/job', job.addJob)
router.get('/jobData', job.getJob)


module.exports = router;