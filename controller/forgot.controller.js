const account = require('../models/userSchema')
const { sendMail } = require('../config/mail')
const forgot = require('../models/forgotTable');
const { generateToken } = require('../middleware/auth');
const forgotControl = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await account.findOne({ email });
        try {
            const prevData = await forgot.findOne({ email })
            if (Date.now() > prevData.expiry.getTime()) {
                await forgot.deleteOne({ email })
            }
            else {
                await sendMail({
                    to: email,
                    subject: "Password Reset Link!",
                    templateName: "forgot",
                    templateData: {
                        appName: "Job Portal",
                        name: user.fullName,
                        expiry: "24 Hours",
                        year: 2026,
                        resetLink: `${process.env.FRONTEND_URL}/auth/reset?token=${prevData.token}&email=${prevData.email}`
                    },
                })
                return res.status(200).json({
                    message: "Password Reset Link Sent Again to your Mail!"
                })
            }
        } catch (err) {

        }
        const token = generateToken({ user })
        const newData = new forgot({
            email,
            token,
            expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
        await newData.save().then(async () => {
            await sendMail({
                to: email,
                subject: "Password Reset Link!",
                templateName: "forgot",
                templateData: {
                    appName: "Job Portal",
                    name: user.fullName,
                    expiry: "24 Hours",
                    year: 2026,
                    resetLink: `${process.env.FRONTEND_URL}/auth/reset?token=${token}&email=${email}`
                },
            })

            return res.status(200).json({
                message: "Reset link sent to update password in your mail!"
            })
        })
        return res.status(400).json({
            message: "Reset Link Can't be sent!"
        })

    } catch (err) {
        return res.status(400).json({
            message: "Account not registered!"
        })
    }
}

module.exports = { forgotControl }