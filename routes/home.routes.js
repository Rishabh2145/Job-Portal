const express = require('express')
const router = express.Router()
const user = require('../controller/signUp.controller')
const signIn = require('../controller/signIn.controller')
const contact = require('../controller/contact.controller')
const dashboard = require('../routes/dashboard.routes')
const userRoutes = require('../routes/user.routes')
const authRoutes = require('./auth.routes')
const jobRoutes = require('./job.routes')
const { Authorization } = require('../middleware/auth')
router.get('/', (req, res) => {
    return res.send("Hello World")
})

router.post('/signup', user.signUp)
router.post('/signin', signIn.signIn)
router.get('/message', Authorization, contact.getMessages)
router.post('/contact', contact.contact)
router.use('/dashboard', dashboard)
router.use('/auth', authRoutes)
router.use('/job', Authorization, jobRoutes)
router.use('/user', Authorization, userRoutes)

module.exports = router