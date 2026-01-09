const { generateToken } = require('../middleware/auth');
const model = require('../models/userSchema');
const { sendMail } = require('../config/mail')
const dotenv = require('dotenv').config()
const verify = require('../models/verification')

const signUp = async (req, res) => {
    try {
        const already = await model.findOne({ email: req.body.email })
        if (already) {
            return res.status(400).json({
                message: 'User Already Registered!'
            })
        }
    } catch {    }
    const user = new model({
        role: req.body.role,
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        mobile: req.body.mobile,
        institute: req.body.institute,
        instituteGrade: req.body.instituteGrade,
        school: req.body.school,
        schoolGrade: req.body.schoolGrade,
        address: req.body.address,
    })
    const token = generateToken({ user })

    const verifyData = new verify({
        email: req.body.email,
        token,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    await verifyData.save()

    await sendMail({
        to: req.body.email,
        subject: "Welcome to Job Portal! Please Verify your Account!",
        templateName: 'signup',
        templateData: {
            name: req.body.fullName,
            portalName: 'Job Portal',
            loginUrl: `${process.env.FRONTEND_URL}/auth/verify?token=${token}&email=${req.body.email}`,
            year: 2026
        }
    })

    user.save().then(() => {
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: "User Data Inserted",
            user,
            verifyData,
            token,
            success: true
        })

    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
}

const profile = async (req, res) => {
    const userId = req.body.id
    try {
        const user = await model.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }
        await model.findByIdAndUpdate(userId, req.body, { upsert: true, runValidators: true, new: true }).then(() => {
            res.status(200).json({
                message: "User Updated Successfully",
                success: true,
                data: req.body
            })
        })
    } catch (err) {
        res.json({ error: err.message })
    }
}

const delProfile = async (req, res) => {
    const id = req.query.id

    try {
        const user = await model.findById(id)
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }
        await model.findByIdAndDelete(id)
        res.status(200).json({
            message: "User Account Deleted!",
            success: true
        })
    } catch (err) {
        res.status(400).json({
            error: err,
            success: false
        })
    }
}

const getAccounts = async (req, res) => {
    try {
        const users = await model.find({})
        res.status(200).json({
            users,
            success: true
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        })
    }
}

module.exports = { signUp, profile, delProfile, getAccounts }