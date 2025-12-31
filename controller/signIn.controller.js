require('dotenv').config({ path: '../.env' })
const model = require('../models/userSchema');
const bcrypt = require('bcrypt')
const { generateToken } = require('../middleware/auth')

const signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await model.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Account Not Registered Please Sign Up First", success: false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials", success: false});
        }
        console.log(user)
        const token = await generateToken({ user })
        return res.status(200).json({
            message: "Logged In",
            user,
            token,
            success: true
        })
    } catch (err) {
        res.status(400).json({ error: err.message, success: false });
    }
}

module.exports = { signIn }