const { generateToken } = require('../middleware/auth');
const model = require('../models/userSchema');

const signUp = async (req, res) => {
    console.log(req.body);
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
        address: req.body.address
    })
    user.save().then(() => {
        console.log(user);
        const token = generateToken({ user })
        res.status(200).json({
            message: "User Data Inserted",
            data: user,
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
    const userId = req.query.id
    try {
        const user = await model.findById(id)
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }
        await model.findByIdAndUpdate(userId, req.body, { upsert: true, runValidators: true, new: true }).then(() => {
            res.status(200).json({
                message: "User Updated Successfully",
                success: true
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
        console.log(users)
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