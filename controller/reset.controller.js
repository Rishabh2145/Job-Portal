const account = require('../models/userSchema')
const forgot = require('../models/forgotTable')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const resetHandle = async (req, res) => {
    const { email, token, password } = req.body
    try {
        const user = await jwt.verify(token, process.env.SECRET_KEY)
        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }
        if (user.user?.email !== email) {
            return res.status(400).json({
                message: "Link is not Valid!"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt);
        await account.updateOne({ email }, {
            $set: {
                password: newPassword
            }
        }).then(() => {
            return res.status(200).json({
                message: "Password reset successfully!"
            })
        })
        return res.status(400).json({
            message: "Unable to reset password!"
        })
    } catch (err) {
        return res.status(400).json({
            message: "Reset Link Expired!"
        })
    }
}

module.exports = { resetHandle }