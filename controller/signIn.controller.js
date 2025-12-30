require('dotenv').config({path: '../.env'})
const model = require('../models/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signIn = async (req, res) => {
    
    const { email, password } = req.body;
    try {
        const user = await model.findOne({ email });
        const token = jwt.sign({userId: user._id, role : user.role, name: user.fullName, email: user.email}, process.env.SECRET_KEY, {expiresIn: '10h'})
        if (!user) {
            return res.status(400).json({ message: "Account Not Registered Please Sign Up First" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        res.status(200).json({
            message: "Sign In Successful",
            data: user,
            token
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { signIn }