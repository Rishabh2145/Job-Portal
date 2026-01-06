require('dotenv').config({ path: '../.env' });
const jwt = require("jsonwebtoken")

const Authorization = (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(404).json({
                message : "Token not found!"
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired Token!",
        })
    }
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}

module.exports = {Authorization, generateToken}