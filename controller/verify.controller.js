const verify = require('../models/verification');
const account = require('../models/userSchema');
const { generateToken } = require('../middleware/auth');
const { sendMail } = require('../config/mail');


const verifyToken = async (req, res) => {
    const { email, token } = req.body
    try {
        const userToken = await verify.findOne({ email })
        if (!userToken) {
            res.status(404).json({
                message: 'User not Found!'
            })
        }
        if (userToken.token === token) {

            if (Date.now() <= userToken.expiry.getTime()) {

                await account.updateOne({ email }, {
                    $set: {
                        isVerified: true
                    }
                }).then(() => {
                    return res.status(200).json({
                        message: 'Account Verified Successfully!'
                    })
                })
            }
            else {
                const user = await account.find({ email })
                const newToken = generateToken({ user })
                await account.updateOne({ email }, {
                    $set: {
                        token: newToken,
                        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
                    }
                })

                await sendMail({
                    to: req.body.email,
                    subject: "Verification Link Expired! Please use the new Verification Link.",
                    templateName: 'signup',
                    templateData: {
                        name: req.body.fullName,
                        portalName: 'Job Portal',
                        loginUrl: `${process.env.FRONTEND_URL}/auth/verify?token=${newToken}&email=${req.body.email}`,
                        year: 2026
                    }
                })
                return res.status(400).json({
                    message: "Verification Link Expired! Sent Again!",
                })
            }
        }
    } catch (err) {
        return res.status(400).json({
            message: 'Link is not Correct!'
        })
    }
}

const checkVerification = async (req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await account.findOne({ email })
        if (user?.isVerified === true) {
            return res.status(200).json({
                message: "User is Verified",
                success: true
            })
        }
        const userToken = await verify.findOne({ email })
        let token = ''
        if (Date.now() <= userToken.expiry.getTime()) {
            token = userToken.token
        }
        else {
            token = generateToken({ user })
            await verify.updateOne({ email }, {
                $set: {
                    token,
                    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
                }
            })
        }

        await sendMail({
            to: email,
            subject: "Account Verification Link!",
            templateName: 'signup',
            templateData: {
                name: email,
                portalName: 'Job Portal',
                loginUrl: `${process.env.FRONTEND_URL}/auth/verify?token=${token}&email=${email}`,
                year: 2026
            }
        })


        return res.status(400).json({
            message: "Account not Verified! Please use the verification link sent to your email to verify the account.",
            success: false
        })
    } catch (err) {
        res.status(500).json({
            message: "Account not created!"
        })
    }
}

module.exports = { verifyToken, checkVerification }