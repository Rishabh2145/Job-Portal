require('dotenv').config({ path: '../.env' });
const jwt = require("jsonwebtoken")

const Authorization = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Token Not Provided!"
            })
        }

        const token = req.cookie.access_token
        if (!token) {
            return res.status(401).json({message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired Token!"
        })
    }
}

module.exports = Authorization