const express = require('express');
const router = express.Router();
const { Authorization } = require('../middleware/auth')

const user = require('../controller/signUp.controller')
const job = require('../controller/job.controller')

router.post('/edit', Authorization, user.profile)
router.post('/job', Authorization, job.addJob)
router.get('/jobData', job.getJob)


module.exports = router;